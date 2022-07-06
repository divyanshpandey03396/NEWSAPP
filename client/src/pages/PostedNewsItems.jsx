import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostedNewsItems = () => {
  const [loading, setLoading] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const result = await axios.post("api/newsitems/getnewsitemsbyuserid", {
        userid: user.userid,
      });
      setLoading(false);
      setNewsItems(result.data);
    } catch (err) {
      setLoading(false);
      console.log(err.response);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteItem = async (newsid) => {
    try {
      setLoading(true);
      await axios.post("api/newsitems/deletenewsitem", {
        newsid,
      });
      setLoading(false);
      toast("News deleted successfully!", "success");
      getData();
    } catch (err) {
      setLoading(false);
      console.log(err.response);
      toast("Something went wrong", "error");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      {newsItems.length > 0 && (
        <div className="p-10">
          <h1 className="text-2xl text-gray-600 mb-5 font-semibold">
            Posted News Items
          </h1>
          <table className="w-full border-2 border-gray-500 p-10">
            <thead className="w-full">
              <tr className="w-full">
                <th className="border-2 border-gray-500 p-2">Id</th>
                <th className="border-2 border-gray-500 p-2">Title</th>
                <th className="border-2 border-gray-500 p-2">Posted On</th>
                <th className="border-2 border-gray-500 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsItems.map((item, i) => {
                return (
                  <tr>
                    <td className="border-2 border-gray-500 p-2">{item._id}</td>
                    <td className="border-2 border-gray-500 p-2">
                      {item.title}
                    </td>
                    <td className="border-2 border-gray-500 p-2">
                      {item.createdAt.slice(0, 10)}
                    </td>
                    <td className="border-2 border-gray-500 p-2 items-center">
                      <div className="flex justify-end space-x-5 pr-5 mt-5">
                        <button
                          className="px-5 py-1 bg-red-700 text-sm text-white"
                          onClick={() => deleteItem(item._id)}
                        >
                          DELETE
                        </button>
                        <button
                          className="px-5 py-1 bg-green-500 text-sm text-white"
                          onClick={() => navigate(`/edit/${item._id}`)}
                        >
                          EDIT
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default PostedNewsItems;
