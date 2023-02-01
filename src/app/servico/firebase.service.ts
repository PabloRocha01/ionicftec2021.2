import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { actionSheetController } from '@ionic/core';
import { timeStamp } from 'console';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

//Ferramenta para manipular as coleções
ItemColection: AngularFirestoreCollection

  constructor(private af: AngularFirestore) { 
    this.ItemColection = af.collection('itens');
  }
//Busca todos os produtos
   //busca nais de um produto
   consulta(id: string, item: any) {
    return this.ItemColection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((varDeCtrl) => {
          const data = varDeCtrl.payload.doc.data();
          const id = varDeCtrl.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }


//Busca somente um produto
  consultaOne(id: string){
    return this.ItemColection.doc(id).valueChanges
  }

  cadastro(item: any){
    return this.ItemColection.add(item)
  }
  deletar(id: string){
    return this.ItemColection.doc(id).delete()
  }
  editar(id: string, item: any){
    return this.ItemColection.doc(id).update(item)
  }

}

