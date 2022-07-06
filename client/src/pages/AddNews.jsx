import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Layout from "../components/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddNews = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);

  const save = async () => {
    try {
      const payload = {
        title,
        description,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        postedBy: { name: user.name, email: user.email, userid: user.userid },
      };
      setLoading(true);

      await axios.post("api/newsitems/addnewsitem", payload);

      setLoading(false);

      toast("News added successfully!", "success");
      navigate("/home");
    } catch (err) {
      setLoading(false);
      console.log(err.response);
      toast("Something went wrong", "error");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <h1 className="text-2xl font-semibold mt-5 ml-5">Add News</h1>
      <div className="px-5 pt-5">
        <input
          type="text"
          className="border-2 h-10 w-full border-gray-300 px-5 mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border-2 w-full border-gray-300 my-2 px-5 mb-2"
          rows={4}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="border-2 border-gray-400 mx-5 rounded px-2">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          editorClassName="draft-editor"
        />
      </div>
      <div className="flex justify-end space-x-5 pr-5 mt-5">
        <button
          className="px-5 py-1 bg-red-700 text-sm text-white"
          onClick={() => navigate("/")}
        >
          BACK
        </button>
        <button
          className="px-5 py-1 bg-green-500 text-sm text-white"
          onClick={save}
        >
          SAVE
        </button>
      </div>
    </Layout>
  );
};

export default AddNews;
