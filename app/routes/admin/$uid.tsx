import { Button, Input } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const reqBody = Object.fromEntries(formData);

  console.log(reqBody);
};

export default function PostManagement() {
  return (
    <div>
      <Form method="post">
        <Input type="text" name="title" />
        <Input type="text" name="slug" />
        <Input type="text" name="desc" />

        <Button type="submit">Create Post</Button>
      </Form>
    </div>
  );
}
