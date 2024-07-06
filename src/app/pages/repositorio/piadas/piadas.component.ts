import { Component } from '@angular/core';
import { ApiChuckNorrisService } from '../../../services/api-chuck-norris.service';
import { TradutorService } from '../../../services/tradutor.service';
import { ApiAleatoriaService } from '../../../services/api-aleatoria.service';
import { setUpLocationSync } from '@angular/router/upgrade';
import { ApiProgramadorService } from '../../../services/api-programador.service';

type Piada = {
  piada_ingles:string,
  piada_portugues:string
}

@Component({
  selector: 'app-piadas',
  templateUrl: './piadas.component.html',
  styleUrl: './piadas.component.scss'
})
export class PiadasComponent {
piada:Piada = {
  piada_ingles:'Click one button to recive a joke',
  piada_portugues:'Clique em um botão para receber uma piada'
}

constructor(
  private chuckNorrisService:ApiChuckNorrisService,
  private tradutorService:TradutorService,
  private aleatoriaService:ApiAleatoriaService,
  private programadorService:ApiProgramadorService
){
  
}

buscaPiadaChuckNorris(){ 
  this.chuckNorrisService.buscaPiada().subscribe({
    next:(resposta)=>{
       this.piada.piada_ingles = resposta.value;
       this.traduzPiada(resposta.value,'en','pt');

    }

  })
        
}

buscaPiadaAleatoria(){
  this.aleatoriaService.buscaPiada().subscribe({
    next:(resposta)=>{
      console.log(resposta)
      this.piada.piada_ingles = resposta.setup+resposta.punchline;
       this.traduzPiada(resposta.setup+resposta.punchline,'en','pt');

      }
    })
}

buscaPiadaProgramador(){
  this.programadorService.buscaPiada().subscribe({
    next:(resposta)=>{
      console.log(resposta)
      this.piada.piada_ingles = resposta[0].setup+resposta[0].punchline;
       this.traduzPiada(resposta[0].setup+resposta[0].punchline,'en','pt');
    }})
}
traduzPiada(piada:string,origem:string,destino:string){
  this.tradutorService.traduzir(piada,origem,destino).subscribe({
    next:(resposta)=>{
     this.piada.piada_portugues = resposta;

    }
  })

}
}

