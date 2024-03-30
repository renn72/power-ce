import { UploadButton } from "~/utils/uploadthing";

import { api } from '~/utils/api'


const Upload = () => {
  const { data: files } = api.files.getAll.useQuery();
  console.log("Files: ", files);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
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
            <div
              key={file.id}
              className="flex gap-4 items-center justify-center"
            >
              <div>{file.name}</div>
              <img
                src={`https://utfs.io/f/${file.key}`}
                alt={file.name}
                className="h-20 w-32 object-fill"
              />
            </div>
          ))
        }
      </div>
    </main>
  );
}

export default Upload;
