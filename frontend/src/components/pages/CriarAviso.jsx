import React, { useState, useEffect  } from "react";
import Container from "../layout/Container";

function CriarAviso(){

    return(
       <Container>
        <div>
            <h1>CRIAR AVISO</h1>
            <form action="">
                <div className="titulo">
                    <label htmlFor="">Titulo</label>
                    <input type="text" />
                </div>

                <div className="descricao">
                    <label htmlFor="">Descrição</label>
                    <textarea name="" id=""></textarea>
                </div>
            </form>
        </div>
       </Container>
    )
}


export default CriarAviso

