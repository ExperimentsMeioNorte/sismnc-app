#!/bin/bash

$pathapp : '';
$app : '';
$urlserver : '';
$developer : '';
$business : '';
$state : '';
$country : '';
$language : '';
$password : '';

path_aplicativo(){
        read -p "Entre com o caminho completo onde se encontra o app: " pathapp
        if [[ $pathapp = "" ]]; then
                echo "Obrigatório digitar o caminhdo do app!"
                path_aplicativo
	fi

	if [ ! -d "$pathapp" ]; then
		echo "Pasta do aplicativo não encontrada!"
		start_build
        fi
}

nome_aplicativo() {
	read -p "Entre com o nome do aplicativo: " app
	if [[ $app = "" ]]; then
        	echo "Obrigatório digitar um nome do aplicativo/site!"
        	nome_aplicativo
	fi
}

url_server(){
	read -p "Entre com a url do servidor: (sem o http) " urlserver
        if [[ $urlserver = '' ]]; then
                echo "Obrigatório digitar uma url!"
                url_server
       	fi
}

nome_desenvolvedor(){
	read -p "Nome do desenvolvedor: " developer
        if [[ $developer = '' ]]; then
                echo "Obrigatório digitar um nome do desenvolvedor!"
                nome_desenvolvedor
       	fi
}

nome_empresa(){
	read -p "Nome da Empresa: " business
        if [[ $business = '' ]]; then
                echo "Obrigatório digitar o nome da empresa!"
                nome_empresa
        fi
}

sigla_estado(){
	read -p "Sigla Estado: " state
        if [[ $state = '' ]]; then
                echo "Obrigatório digitar o estado!"
                sigla_estado
        fi
}

sigla_pais(){
	read -p "Sigla Pais: (2 digitos) " country
        if [[ $country = '' ]]; then
                echo "Obrigatório digitar o país!"
                sigla_pais
        fi
}

sigla_lingua(){
	read -p "Sigla Linguagem: (2 digitos, ex: BR) " language
        if [[ $language = '' ]]; then
                echo "Obrigatório digitar uma linguagem!"
                sigla_lingua
        fi
}

senha_chave(){
	read -p "senha da chave: (minimo 6 digitos) " password
        if [[ $password = '' ]]; then
                echo "Obrigatório digitar uma senha de 6 didigos!"
                senha_chave
        fi
}


start_build(){
        cd ~
	sudo rm ~/.keystore

	nome_aplicativo
	path_aplicativo
	cd $pathapp

	url_server
	#nome_desenvolvedor
	#nome_empresa
	#sigla_estado
	#sigla_pais
	#sigla_lingua
	senha_chave

	#cria a pasta da compilacao
	meteor build ~/build-output-$app \--server=$urlserver

	#cria a chave do aplicativo
	keytool -genkey -alias $app -keyalg RSA \-keysize 2048 -validity 10000

    #-dname "/CN=$developer/OU=$business/O=$business/L=$state/ST=$country/C=language" -keypass $password -storepass $password

	#adiciona a chave a compilacao
	cd ~/build-output-$app/android/
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 release-unsigned.apk $app -keypass $password

	#cria o app com a chave compilada
	~/.meteor/android_bundle/android-sdk/build-tools/20.0.0/zipalign 4 \release-unsigned.apk $app.apk

	echo "<<<<<<<<<< Aplicativo compilado com sucesso! >>>>>>>>>>>>>>"
}

start_build
