import React, { useEffect, useState,useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { View,Text,TextInput } from 'react-native'
//importamos el boton celeste
import { BotonCeleste } from './components/Boton'
//importamos la fuente
import {Aladin_400Regular,useFonts} from '@expo-google-fonts/aladin'
//importamos el appLoading
import AppLoading from 'expo-app-loading'

//importamos el packete o modulo de los iconos
import { Entypo } from '@expo/vector-icons';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { color } from '@rneui/base'
//importamos axios para conexion con nuestro servidor
import axios from 'axios'
//ahora importamos el asyncstorage que nos ayudara con sesssion de usuario
import AsyncStorage from '@react-native-async-storage/async-storage';
//importamos navegacion
import Navegacion from './Navegacion'




const Acceso = () => {

    const[email,setEmail] = useState("");
    const[contrasena,setContrasena] = useState("");

    const [appIsReady, setAppIsReady] = useState(false);

    const [user,setUser] =useState();

let [cargarFuente] = useFonts({
    Aladin_400Regular
})


useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
    
    obtenerAlmacenamiento();



  }, []);

  const almacenamientoDato = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  
const obtenerAlmacenamiento = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
/*     return jsonValue != null ? JSON.parse(jsonValue) : null; */
    const datosAsyncStorage =  JSON.parse(jsonValue)
    setUser(datosAsyncStorage)
    console.log("Los datos actuales de asinc storage",user.token);
  } catch(e) {
    // error reading value
  }
}




const AccesoLogin = async () => {

      if(email.length===0  && contrasena.length===0){
          alert("!Existen campos vacios")
      }else{
        console.log("email es:",email.email,"contrasena es:",contrasena.email);

        const respuesta = await axios.get('http://192.168.132.35:4000/Registro/'+email.email)
        console.log(respuesta.data);
     if(respuesta.data.length){
      const respuestaContra = await axios.get('http://192.168.132.35:4000/RegistroPassword/'+email.email+'/'+contrasena.contrasena);
      if(respuestaContra.data == 'error'){
        alert("!Error password")
      }else{
        alert("!Conecction successful");
        console.log(respuestaContra.data);
       almacenamientoDato(respuestaContra.data);
       obtenerAlmacenamiento();
      }
    }else{
      alert("!Email not found")
    }   
        
      }
     
}

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
if(!cargarFuente){
  return  <AppLoading/>
}else{
    return(
        user? <Navegacion/>:<View   style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#1A99F9'}}
        onLayout={onLayoutRootView} >
           <View style={stilos.trasFondo}>
                    <View style={stilos.titulo}>
                    <Text style={{fontFamily:'Aladin_400Regular',fontSize:60,alignSelf:"center",color:'#ffffff'}}>Saveme</Text>
                    <Text style={{fontFamily:'Aladin_400Regular',fontSize:60,alignSelf:"center",color:'#ffffff',marginLeft:45}}>Me <Entypo name="location-pin" size={40} color="#ffffff" /></Text>
                    </View>
                    <View style={stilos.fondo}>
                    <TextInput
                    onChangeText={(email) => setEmail({ email })}
                    placeholder={'Username@gmail.com'}
                    style={{marginTop:60,borderColor:"#000000",borderWidth:1,width:300,borderRadius:10,height:50,color:"white",textAlign:"center"}}
                    />
                    <TextInput
                    onChangeText={(contrasena) => setContrasena({ contrasena })}
                    placeholder={'***Password***'}
                    secureTextEntry={true}
                    style={{marginTop:25,borderColor:"#000000",borderWidth:1,width:300,borderRadius:10,height:50,color:"white",textAlign:"center"}}
                    />
                    <View style={stilos.boton}>
                    <BotonCeleste  onPress={() => AccesoLogin()}  text="Iniciar Aplicacion"/>
                    </View>
                    </View>
                    <Text style={{alignSelf:'center',marginTop:65,color:"white"}}>Saveme.com © 2022 - 2023 All rights reserved DevArs</Text>
           </View>
        </View>
    )
}


}



const stilos = StyleSheet.create({
    trasFondo:{
        backgroundColor:'#1A99F9',
        marginTop:'20%',
        height:750,
        width:410,
        alignSelf:"center",
        borderRadius:100
    },
    inicio:{
        backgroundColor:'#1A99F9',
        height:850
    },
    fondo:{
        alignItems: 'center',
        marginTop:'10%',
        backgroundColor:'#000000',
        height:400,
        opacity:0.5,
        width:350,
        alignSelf:"center",
        borderRadius:10
    },
    titulo:{
            marginTop:'20%',
    },
    boton:{
        marginTop:'15%',
    }

})
export default Acceso