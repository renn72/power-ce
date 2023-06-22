import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

import TemplateSelect from "./templateSelect";


const Users: NextPage = () => {

  // Check for admin role
  const { user } = useUser();
  if (!user) return <div>Login</div>
  if (user.organizationMemberships[0]?.role !== 'admin') return <div>Not auth</div>

  const { data: allUsers, isLoading: usersLoading } = api.users.getAll.useQuery();
  console.log('users', allUsers)
  if (usersLoading) return <div>loading</div>;

  const onSelectTemplate = (template: string, userId: string) => {
    console.log('template', template)
    console.log('userId', userId)
  }

  const onClearTemplate = (userId: string) => {
    console.log('userId', userId)
  }

  const onSetTemplate = (template: string, userId: string) => {
    console.log('template', template)
    console.log('userId', userId)
  }

  return (
    <>
      <div className="h-full flex flex-col bg-gray-600 ">
        <header className="bg-white shadow-xl">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Users</h1>
          </div>
        </header>
        <main >
          <div className="mx-auto max-w-2xl py-6 sm:px-6 lg:px-8">
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
