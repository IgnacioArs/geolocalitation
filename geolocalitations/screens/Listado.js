
import { StyleSheet, Text, View, ScrollView,Button,Image, ActivityIndicator, RefreshControl} from 'react-native';
import React, { useEffect, useState } from 'react'
import {ListItem,Avatar} from '@rneui/themed'
/* import logoBlack from '../image/LogoFondoNegro.jpeg' */
import { BotonCeleste } from '../components/Boton';

import { MaterialCommunityIcons } from '@expo/vector-icons';



import { useNavigation } from '@react-navigation/native';

const Listado = (props) => {

  const navegacion = useNavigation()

const [clientes,setClientes] = useState([])
const [refrescar,setRefrescar] = useState(false)
const [db,setDB] = useState([])


const PintarClientes = (db) => {


    const nuevoCliente = {
      id:db.id,
      fecha:db.fecha,
      nombre:db.nombre,
      instagram:db.instagram,
      detalle:db.detalle,
      tarea:db.tarea,
      precio:db.precio
     }
  
   /*   setClientes([]) */
      setClientes((clientes) => ([
        ...clientes,
        {
          id:nuevoCliente.id,
          fecha:nuevoCliente.fecha,
          nombre:nuevoCliente.nombre,
          instagram:nuevoCliente.instagram,
          detalle:nuevoCliente.detalle,
          tarea:nuevoCliente.tarea,
          precio:nuevoCliente.precio
        }
      ])) 



}       





const eliminarCliente = (id) => {
  
  console.log("MOSTRANDO EL ID PARA ELIMINAR EL USUARIO",id)

db.remove(id)
alert("el usuario numero ("+id+") !Eliminado")
navegacion.navigate("StackScreens")
}




useEffect(()=>{
  /* db.all()
  .then( 
  datos => datos.forEach( c => {if (c || c>c) {
    PintarClientes(c)
  }}))  */
},[])  





const cargar = React.useCallback(()=> {
setRefrescar(true)
/* setClientes([])
db.all()
.then( 
datos => datos.forEach( c => {if (c || c>c) {
  PintarClientes(c)
}}))  */
setRefrescar(false)
})





return (
  <ScrollView   refreshControl={<RefreshControl refreshing={refrescar} colors={["#000000"]} onRefresh={cargar}/>}>
        {/*     <RefreshControl  
          onRefresh={()=> console.log("cargando")}
          /> */}
    <View style={stiloss.head}>
 {/*    <MaterialCommunityIcons name="creation" size={24} color="black" /> */}
    <Button
      onPress={() => props.navigation.navigate("Localizar")}
      title="Ir a localizar"
    />
    </View>
   
       {clientes.map(cli => ( <ListItem
          key={cli.id} 
          bottomDivider
          onPress={() => {
            props.navigation.navigate("ClienteDetalle", {
              id: cli.id, 
            });
          }}
        >

          <ListItem.Chevron />
          <Avatar
            source={{
              uri:
              "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png",
            }}
            rounded
            />
         
          <ListItem.Content>
            <ListItem.Title key={`${cli.id}`}><Text>N°({`${cli.id}`})</Text></ListItem.Title>
            <ListItem.Subtitle><Text><MaterialCommunityIcons name="calendar" size={15} color="black" />: {`${cli.fecha}`}</Text></ListItem.Subtitle>
            <ListItem.Subtitle><Text><MaterialCommunityIcons name="account-box" size={15} color="black" />: {`${cli.nombre}`}</Text></ListItem.Subtitle>
            <ListItem.Subtitle><Text><MaterialCommunityIcons name="instagram" size={15} color="black" />: {`${cli.instagram}`}</Text></ListItem.Subtitle>
            <ListItem.Subtitle><Text><MaterialCommunityIcons  name="car" size={15} color="black" />: {`${cli.detalle}`}</Text></ListItem.Subtitle>
            <ListItem.Subtitle><Text><MaterialCommunityIcons name="hammer-wrench" size={15} color="black" />: {`${cli.tarea}`}</Text></ListItem.Subtitle>
            <ListItem.Subtitle><Text><MaterialCommunityIcons name="account-cash" size={15} color="black" />: {`${cli.precio}`} $</Text></ListItem.Subtitle>
          </ListItem.Content>
          <BotonCeleste onPress ={() => eliminarCliente(cli.id)} text="Eliminar Cliente"/>
        </ListItem>))}
          
        
 
  
  </ScrollView>
);
}
                


const stiloss = StyleSheet.create({
  titulo:{color:"#ffffff",textAlign:"center",fontSize:15,alignSelf:'center'},
  tituloDOS:{backgroundColor:'black',alignSelf:'center',width:200,height:25,marginBottom:10,marginTop:10,borderRadius:3000,textAlign:'center'},
  container:{backgroundColor:'#000000'},
  datos:{
    backgroundColor:'#191919',width:400,alignSelf:'center',borderRadius:20
  },
  logoBlack:{
    width:500,
    height:110,
    alignSelf:'center',
    position:'relative',
    opacity:0.5
  },
  head:{
    marginTop:50
  }

})
export default Listado;