import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
// import { useAppSelector } from "@/src/hooks/states";

interface Props {
  blogContent: (content: string) => void;
  initialValue?: string;
}

const TextEditor = ({ blogContent, initialValue }: Props) => {
  // const mode = useAppSelector((state) => state.authReducer.mode);

  const editorRef = useRef<any>(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      /*  console.log(
        "title",
        editorRef.current
          .getContent()
          .split("\n")[0]
          .replace(/<[^>]+>/g, "")
      );
 */
    }
  };

  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_tiny}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={
          initialValue
            ? initialValue
            : '<h1 style="text-align: center;">Your blog title here</h1>'
        }
        init={{
          // selector: 'textarea#open-source-plugins',
          plugins:
            "preview importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link codesample table charmap nonbreaking insertdatetime advlist lists wordcount help charmap quickbars emoticons",
          menubar: false,
          toolbar:
            "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | charmap emoticons | fullscreen  preview  |  image  link codesample | ltr rtl",
          toolbar_sticky: false,
          // toolbar_sticky_offset: isSmallScreen ? 102 : 108,
          image_advtab: true,

          image_list: [
            {
              title: "sample image",
              value:
                "https://images.pexels.com/photos/4467632/pexels-photo-4467632.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
            },
          ],

          importcss_append: true,

          height: 700,

          image_caption: true,
          quickbars_selection_toolbar:
            "bold italic | quicklink h1 h2 h3 blockquote quicktable",
          quickbars_insert_toolbar: false,

          toolbar_mode: "wrap",
          contextmenu: false,
          // skin: mode === "dark" ? "oxide-dark" : "oxide",
          // content_css: mode === "dark" ? "dark" : "default",

          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
        }}
        onEditorChange={blogContent}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
};

export default TextEditor;

/* 


init={{
          placeholder: "Add your title on the first Line",
          height: 700,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "quickbars",
          ],
          toolbar:
            "undo redo | blocks fontsizeinput image fullscreen quickbars | " +
            "bold italic forecolor  | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          toolbar_mode: "wrap",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          quickbars_selection_toolbar:
            "bold italic | quicklink h2 h3 blockquote ",
        }}


*/
