// Importing helper modules
import { useCallback, useMemo, useRef, useState } from "react";
import { doc, setDoc, addDoc } from "firebase/firestore"; 
// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import "react-quill/dist/quill.snow.css";
import React from 'react';
import styles from "../index.css";

import db from "../firebase"

// const Editor = () => {
//   // Editor state
//   const [blog, setBlog] = useState("");
//   const [title, setTitle] = useState("");

//   // Editor ref
//   const quill = useRef();

//   // Handler to handle button clicked
//   async function handler() {
//     console.log(title.target.value);
//     console.log(blog);
//     await setDoc(doc(db, "articles", title.target.value), {
//         title: title.target.value,
//         content: blog,
//         });
//   }

//   const imageHandler = useCallback(() => {
//     // Create an input element of type 'file'
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     // When a file is selected
//     input.onchange = () => {
//       const file = input.files[0];
//       const reader = new FileReader();

//       // Read the selected file as a data URL
//       reader.onload = () => {
//         const imageUrl = reader.result;
//         const quillEditor = quill.current.getEditor();

//         // Get the current selection range and insert the image at that index
//         const range = quillEditor.getSelection(true);
//         quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
//       };

//       reader.readAsDataURL(file);
//     };
//   }, []);

//   const modules = useMemo(
//     () => ({
//       toolbar: {
//         container: [
//           [{ header: [2, 3, 4, false] }],
//           ["bold", "italic", "underline", "blockquote"],
//           [{ color: [] }],
//           [
//             { list: "ordered" },
//             { list: "bullet" },
//             { indent: "-1" },
//             { indent: "+1" },
//           ],
//           ["link", "image"],
//           ["clean"],
//         ],
//         handlers: {
//           image: imageHandler,
//         },
//       },
//       clipboard: {
//         matchVisual: true,
//       },
//     }),
//     [imageHandler]
//   );

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "color",
//     "clean",
//   ];

//   return (
//     <div className={styles.wrapper}>
//       <label>
//         Title:
//         <input type="text" name={title} onChange={(title) => setTitle(title)} placeholder="Enter your blog title here"  />
//       </label>
//       <br/>
//       <label className={styles.label}>Editor Content</label>
//       <QuillEditor
//         ref={(el) => (quill.current = el)}
//         className={styles.editor}
//         theme="snow"
//         value={blog}
//         formats={formats}
//         modules={modules}
//         onChange={(blog) => setBlog(blog)}
//       />
//       <button onClick={handler} className={styles.btn}>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default Editor;


// Editor Class

class Editor extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      blog:this.props.content,
      title:this.props.title,
      id:this.props.id
    };
    this.quill = React.createRef();
  }

  handler = async () => {
    console.log(this.state.title);
    console.log(this.state.blog);
    console.log(this.state.id);
    if (this.state.id) {
      await setDoc(doc(db, "articles", this.state.id), {
        title: this.state.title,
        content: this.state.blog,
      });
    }

    else {
        const docRef = await addDoc(doc(db, "articles"), {
            title: this.state.title,
            content: this.state.blog,
        });
        this.state.id = docRef.id;
    }

    window.location.href='/blog/' + this.state.id;
  };


  imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = this.quill.current.getEditor();
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
      };

      reader.readAsDataURL(file);
    };
  };

  modules = {
    toolbar: {
      container: [
        [{ header: [2, 3, 4, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: this.imageHandler,
      },
    },
    clipboard: {
      matchVisual: true,
    },
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  render() {
    return (
      <div className={styles.wrapper}>
        <label>
          Title:
          <input
            type="text"
            value={this.state.title}
            name={this.state.title}
            onChange={(title) => this.setState({ title: title.target.value })}
            placeholder="Enter your blog title here"
          />
        </label>
        <br />
        <label className={styles.label}>Editor Content</label>
        <QuillEditor
          ref={this.quill}
            className={styles.editor}
            theme="snow"
            value={this.state.blog}
            formats={this.formats}
            modules={this.modules}
            onChange={(blog) => this.setState({ blog: blog })}
            />
            <button onClick={this.handler} className={styles.btn}>
              Submit
            </button>
            </div>
    );
    }
}

export default Editor;