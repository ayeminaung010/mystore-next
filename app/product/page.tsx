'use client'
import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProductPage(){
    const [products,setProducts]  = useState<any>([]); //empty array = length = 0  -> assign 

    useEffect(() => {
        getProducts();
    },[1])

    const getProducts = async() => {
        await axios.get('/product/api').then((res) => { //use axios for data fetching
            console.log("Product Data",res.data); 
            setProducts(res.data);
        });
    }

    const handleDelete = async(item:any) => {
        await axios.delete(`/product/api/${item?.Id}`).then((res) => {
            console.log("Delete", res.data); 
            getProducts(); //after delete,call data list back   
        })
    }
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle color={'danger'}>
                        Product List
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {
                    products?.map((item:any,index:number) => {
                        return <IonItem key={index}>
                            {item?.Name}
                            <IonButtons slot='end'> 
                                {/* slot end -> go right & start -> go left */}
                                <IonButton onClick={() => handleDelete(item)}>Delete</IonButton>
                            </IonButtons>
                        </IonItem>
                    })
                }
            </IonContent>
        </IonPage>
    )
}
