import { useEffect, useState } from "react";
import { databases, DATABASE_ID, COLLECTION_ID } from "../../appWriteConfig";
import { ID, Query } from "appwrite";
import client from "../../appWriteConfig";
import Header from "../Componants/Header";
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
                    setMessages( pervState => [ response.payload.body , ...pervState]);
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
        console.log(user);
        let payload = {
            body : messageBody,
            userId : user.$id,
            userName : user.name
        }
        await databases.createDocument( DATABASE_ID, COLLECTION_ID, ID.unique(), payload);
        setMessageBody("")
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
    }
    return <div>
                <Header/>
                <form onSubmit={handelSubmit}>
                    <input type="text"
                     placeholder="Enter Message"
                     onChange={(event) => setMessageBody(event.target.value)}
                     value={messageBody}   
                     />
                     <input type="submit" />
                </form>
                <br/>
               <div>
               {messages.map(item => 
               <div key={item.$id}>
                    <p>{item.userName || "Anonymouse"}</p>
                    <p>{item.body}</p>
                    <p>{item.$createdAt}</p>
                    <button onClick={() => handelDelete(item.$id)}>X</button>
               </div>
               )}
               </div> 
           </div>
}