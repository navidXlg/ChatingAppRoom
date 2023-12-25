import { useEffect, useState } from "react";
import { databases, DATABASE_ID, COLLECTION_ID } from "../../appWriteConfig";
import { ID, Query } from "appwrite";
import client from "../../appWriteConfig";
import Header from "../Componants/Header";
import { BsX } from "react-icons/bs";
import { useAuth } from "../Hooks/useAuth";





export default function Room(){

    const {user} = useAuth();
    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState("");

    useEffect(() => {
         getMessage();
         const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`, response => {
            // Callback will be executed on changes for documents A and all files.

                if(response.events.includes("databases.*.collections.*.documents.*.create")){
                    setMessages( pervState => [ response.payload , ...pervState]);
                }

                if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                    setMessages( pervState  => pervState.filter( item => item.$id !== response.payload.$id));
                }
        });

        return () => {
            unsubscribe();
        }
    },[]);


    const handelSubmit = async (event) => {
        event.preventDefault();
        let payload = {
            body : messageBody,
            userId : user.$id,
            userName : user.name
        };

        setMessageBody("");
        await databases.createDocument( DATABASE_ID, COLLECTION_ID, ID.unique(), payload)
        .then(item => console.log(item))
        .catch(err => console.log(err))
    }

    const getMessage = async () => {
    const res =  await databases.listDocuments(DATABASE_ID,
    COLLECTION_ID,
    [
        Query.orderDesc("$createdAt"),
        Query.limit(20),
    ]
    );
    setMessages(res.documents);
    };

    const handelDelete = async (id) => {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    };

    const style = (item) => {
      return item.userName === user.name ?  "flex justify-start gap-4 items-center mb-2 flex-row-reverse":
     "flex justify-start gap-4 items-center mb-2 ";
    };


    return <div className="flex h-screen flex-col bg-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-4">
                <h1 className="text-center text-2xl font-bold text-white">
                    <Header/>
                </h1>
            </div>
            <div className="flex-grow overflow-y-auto">
            <div className="flex flex-col space-y-2 p-4">
                {messages.map(item => 
                    <div key={item.$id} className={style(item)}>
                        <div className="bg-slate-800 text-white inline-block rounded-full px-3 py-2">
                          {item.userName ? item.userName.split("").slice(0,2).join("").toUpperCase() : "AN"}
                        </div>
                        <div className="relative min-w-15 flex-wrap items-center self-end rounded-xl rounded-tr bg-blue-500 py-2 px-3 text-white">
                            <button onClick={() => handelDelete(item.$id)} className="absolute top-1 right-1"><BsX/></button>
                            <p className="mt-6">{item.body}</p>
                        </div>    
                    </div>
                    )}
            </div>
            </div>
            <form onSubmit={handelSubmit} className="w-full flex items-center p-4" >
                <input 
                type="text" 
                placeholder="Type your message..." 
                className="w-full rounded-lg border border-gray-300 px-4 py-2" 
                value={messageBody}
                onChange={(event) => setMessageBody(event.target.value)}
                />
                <button type="submit" className="ml-2 rounded-lg hover:bg-blue-700 bg-blue-500 px-4 py-2 text-white">Send</button>
            </form>
    </div>
}

