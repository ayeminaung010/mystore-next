"use client";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { useRef } from "react";

export default function page() {
  const nameRef = useRef<HTMLIonInputElement>(null); //html input /IonInput  r
  const buyPriceRef = useRef<HTMLIonInputElement>(null);
  const sellPriceRef = useRef<HTMLIonInputElement>(null);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", nameRef.current!.value?.toString() || ""); //change string of nameRef value
    formData.append("buyPrice", buyPriceRef.current!.value?.toString() || "");
    formData.append("sellPrice", sellPriceRef.current!.value?.toString() || "");

    await axios.post("/product/api", formData).then((res) => {
      console.log("Add response..: ", res.data);
      if (res.data.status !== "error") {
        window.location.href = "/product";
      } else {
        alert(res.data.error);
      }
    }); //post data to api
  };
  return (
    <div>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add Product</IonTitle>
            <IonButtons>
              <IonButton onClick={handleSave}>Save</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonInput
              type="text"
              label="Name"
              labelPlacement="stacked" //stack mean at the top
              placeholder="Name"
              ref={nameRef}
            />
          </IonItem>
          <IonItem>
            <IonInput
              type="number"
              label="Buy Price"
              labelPlacement="stacked" //floatin mean -> insert data  small and go to top
              placeholder="Buy Price"
              ref={buyPriceRef}
            />
          </IonItem>
          <IonItem>
            <IonInput
              type="number"
              label="Sell Price"
              labelPlacement="stacked" //fixed mean take position itself
              placeholder="Sell Price"
              ref={sellPriceRef}
            />
          </IonItem>
        </IonContent>
      </IonPage>
    </div>
  );
}
