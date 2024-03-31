import { useState } from "react";
import { UploadButton } from "~/utils/uploadthing";
import { api } from '~/utils/api'
import { useSession } from 'next-auth/react'

import {Button} from '@/components/ui/button'

const File = ({ file }: { file: { id: string, name: string, key: string } }) => {
  const utils = api.useUtils()
  const [disabled, setDisabled] = useState(false);
  const { mutate: deleteFile } = api.files.delete.useMutation(
    {
      onSuccess: () => {
        utils.files.getAll.invalidate();
      }
    }
  );
  return (
    <div
      className="flex gap-4 items-center justify-center"
    >
      <div>{file.name}</div>
      <img
        src={`https://utfs.io/f/${file.key}`}
        alt={file.name}
        className="h-20 w-32 object-fill"
      />
      <Button
        variant="destructive"
        disabled={disabled}
        onClick={() => {
          setDisabled(true);
          deleteFile({ key: file.key });
        }}
      >
        delete
      </Button>
    </div>
  );
}

const Upload = () => {

  const { data: files } = api.files.getAll.useQuery();
  const utils = api.useUtils()
  const { data: session } = useSession()

  const userId = session?.user?.id || ''
  const ctx = api.useUtils()
  const user = ctx.users.get.getData({ userId: userId, })
  if (!user) return <div>Login</div>
  if (!user.isAdmin) return <div>Not Authorized</div>

  console.log("Files: ", files);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          utils.files.getAll.invalidate();
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <div
        className="flex flex-col gap-4"
      >
        {
          files?.files.map((file) => (
            <File key={file.id} file={file} />
          ))
        }
      </div>
    </main>
  );
}

export default Upload;
