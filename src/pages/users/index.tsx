import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";


import TemplateSelect from "./templateSelect";


const Users: NextPage = () => {

  // Check for admin role
  const { user } = useUser();
  if (!user) return <div>Login</div>
  if (user.organizationMemberships[0]?.role !== 'admin') return <div>Not auth</div>

  const ctx = api.useContext();

  const { data: userPrograms, isLoading: userProgramsLoading } = api.userPrograms.getAll.useQuery();
  const { data: allUsers, isLoading: usersLoading } = api.users.getAll.useQuery();
  const { data: blocksData, isLoading: blocksLoading } = api.blocks.getAll.useQuery();
  const { mutate: userProgramCreateMutate, } = api.userPrograms.create.useMutation({
    onSuccess: () => {
      toast.success('Saved')
      void ctx.blocks.getAll.invalidate()
      void ctx.userPrograms.getAll.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  });
  const { mutate: userProgramDeleteMutate, } = api.userPrograms.delete.useMutation({
    onSuccess: () => {
      console.log('success')
      toast.success('Removed')
      void ctx.blocks.getAll.invalidate()
      void ctx.blocks.getAllPrograms.invalidate()
      void ctx.userPrograms.getAll.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  });



  const onSelectTemplate = (template: string, userId: string) => {
    console.log('template', template)
    console.log('userId', userId)
  }

  const onClearTemplate = (userId: string) => {
    console.log('userId', userId)
    userProgramDeleteMutate({
      userId: userId
    })
  }

  const onSetTemplate = (template: string, userId: string) => {
    console.log('template', template)
    console.log('userId', userId)
    const templateId = blocksData?.find((block) => block.name === template)?.id
    console.log('templateId', templateId)
    if (!templateId) return

    
    userProgramCreateMutate({
      userId : userId,
      templateId: templateId,
      programId: 'test'
    })
  }

  if (usersLoading || userProgramsLoading || blocksLoading) return <div>loading</div>;

  return (
    <>
      <div className="h-full flex flex-col bg-gray-600 ">
        <header className="bg-white shadow-xl">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Users</h1>
          </div>
        </header>
        <main >
          <div className="mx-auto max-w-3xl py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-2">
              <div className="text-xl font-bold text-gray-200">Admins</div>
              <div className="flex flex-col gap-2">
                {allUsers?.admins?.map((user) => (
                  <TemplateSelect
                    key={user.id}
                    onSelectTemplate={onSelectTemplate}
                    onSetTemplate={onSetTemplate}
                    onClearTemplate={onClearTemplate}
                    userId={user.id}
                    userFirstName={user.firstName}
                    userLastName={user.lastName}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xl font-bold text-gray-200">Users</div>
              <div className="flex flex-col gap-2">
                {allUsers?.users?.map((user) => (
                  <TemplateSelect
                    key={user.id}
                    onSelectTemplate={onSelectTemplate}
                    onSetTemplate={onSetTemplate}
                    onClearTemplate={onClearTemplate}
                    userId={user.id}
                    userFirstName={user.firstName}
                    userLastName={user.lastName}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Users;
