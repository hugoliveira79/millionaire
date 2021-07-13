var ajudas = 3;
var nivel =0;
var round =1;

var escolha;
var certa;
var pronto=0;

$(document).ready(function(){

	$('.home').click(function(event) {
		/* Act on the event */

		$('.area-jogo').fadeIn(100);
		$(this).fadeOut(500);
			//setPerguntas = [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p13,p17,p18,p19,p29,p31,p32,p33,p34,p35,p36,p37,p38,p39,p40,p41,p42,p43];
		setPerguntas = [p2,p3,p4,p5,p6,p7,p8,p9,p10,p12,p13,p14,p15,p17,p18,p19,p20,p21,p22,p23,p24,p25,p26,p27,p28,p29,p30,p31,p32,p33,p34,p35,p36,p37,p38,p39];
	
	 //setPerguntas=[p12];

	 //1,11,16, 

	shuffle(setPerguntas);
	mostraPergunta();
	var actualQuestion;
	
	});

	$('.ooohhh, .ooohhh-n3, .parabens-n6 ').click(function(){
		newTeam();
	});

	


});

/* TIMMER STUFF */

var timeInSecs;
var ticker;

function startTimer(secs){
	// if (timeToShow!='10.1'){
		timeInSecs = parseInt(secs)+1;

		ticker = setInterval(function() {
			startTime=0;
		    var elapsedTime = secs + startTime;
		    secs++;
		    timeToShow=(elapsedTime / 10).toFixed(1);
		//console.log(timeToShow);
		$('#timer_play').val(timeToShow);



		    document.getElementById("countdown").innerHTML = timeToShow;

		    //PARA O COUNTER
		    if(timeToShow=='60.0'){
		    	clearInterval(ticker);
	
		    	if( $('#selectedAnswer').val()=='0'){
		    		
			//alert('falhou');
					$('.som-falhou')[0].play();

					//$('.r-'+escolha).addClass('r-'+escolha+'-errado');

					$('.r-'+actualQuestion.r_certa).addClass('r-'+actualQuestion.r_certa+'-certo');

					if(ajudas==0){
						if(nivel >=3)
							$('audio').stop();

							$('.ooohhh-n3').fadeIn(500,function(){
							$('.som-falhou')[0].play();

							});

						if(nivel<3)
							$('audio').stop();

							$('.ooohhh').fadeIn(500, function(){
								$('.som-falhou')[0].play();
							});
							


						$('.area-jogo').fadeOut();

						//alert('acabou o jogo');
					}
		    	}
		    }
		   
					    


		}, 100);


	//}

}



/**/

function mostraPergunta(){
	//alert('mostra');
	$('#selectedAnswer').val('0');
	$('audio').stop();
	$('.som-nova-pergunta')[0].play();
	pronto=0;
	//alert('resposta'+answer);
	console.log('NIVEL:'+nivel);
	//$('.n'+nivel).attr('src','images/n'+nivel+'Activo.png');
	//$('.gestao-niveis img').attr('src','images/progresso_'+nivel+'.png');


	$('.nova-pergunta').css('pointer-events','none');
	$('.respostas li').css('pointer-events','auto');


	$('.r-A').removeClass('r-A-errado');
	$('.r-A').removeClass('r-A-certo');
	$('.r-A').removeClass('r-A-block');

	$('.r-B').removeClass('r-B-errado');
	$('.r-B').removeClass('r-B-certo');
	$('.r-B').removeClass('r-B-block');

	$('.r-C').removeClass('r-C-errado');
	$('.r-C').removeClass('r-C-certo');
	$('.r-C').removeClass('r-C-block');

	$('.r-D').removeClass('r-D-errado');
	$('.r-D').removeClass('r-D-certo');
	$('.r-D').removeClass('r-D-block');



	//console.log(nivel);

	//console.log(setPerguntas);


	//recebe o array de perguntas e as ajudas.
	//retira a ultima pergunta do array e exibe no ecra 
	var question = setPerguntas[setPerguntas.length-1];
	actualQuestion=question;

	setPerguntas.pop();
	//console.log(question);
	//DESENHA PERGUNTA
	$('.pergunta p').html(question.texto);
	//DESENHA RESPOSTAS POSSIVEIS
	$('.r-A p').html(question.a);
	$('.r-B p').html(question.b);
	$('.r-C p').html(question.c);
	$('.r-D p').html(question.d);

	startTimer(0);  // 60 seconds 


}

function checkAnswer(){
	//alert(certa);

	if ( $('#selectedAnswer').val()!='0') {

	activeTeam = $('#active_team').val();

	 $('#selectedAnswer').val('1');


	switch (activeTeam){
		case 'A' : { targetScore = 'score_pontuation_a'; targetShowScore='score-a'} break;
		case 'B' : { targetScore = 'score_pontuation_b'; targetShowScore='score-b'} break;
		case 'C' : { targetScore = 'score_pontuation_c'; targetShowScore='score-c'} break;
		case 'D' : { targetScore = 'score_pontuation_d'; targetShowScore='score-d'} break;

	}
	actualLevel = parseInt($('#nivel_actual').val());

	oldScore= parseInt($('#'+targetScore).val());

	//verificar factor bonus

	var answerTime =$('#timer_play').val();

	answerTime=parseInt(answerTime);

	if(answerTime>=0 && answerTime <=10){
		factor = 5;
	} 
	if(answerTime>=11 && answerTime <=20){
		factor = 4;
	}

	if(answerTime>=21 && answerTime <=30){
		factor = 3;
	}

	if(answerTime>=31 && answerTime <=40){
		factor = 2;
	}

	if(answerTime>=41 && answerTime <=50){
		factor = 1;
	}

	if(answerTime>=51 && answerTime <=60){
		factor = 0;
	}
	/*FIIM CALCULO BONUS*/

	if(escolha==certa){
		//alert('acertou');
		//verifica qual a equipa activa

		

		score = oldScore+ 10+ factor;
		$('#'+targetScore).val(score);
		//alert(targetShowScore+' '+score);
		$('.'+targetShowScore+' span').html(score);

		$('.r-'+certa).addClass('r-'+certa+'-certo');
		$('.som-acertou')[0].play();

		if(nivel<5){
			//mostraPergunta();
			nivel++;
			$('.nova-pergunta').css('pointer-events','auto');
			pronto =1;

			actualLevel = $('#nivel_actual').val(nivel);
			$('.gestao-niveis img').attr('src','images/progresso_'+nivel+'.png');


			


		} else {
			nivel++;

			$('.gestao-niveis img').attr('src','images/progresso_'+nivel+'.png');
			setTimeout(function(){

			

			//if(nivel >=3)
				//alert('EQUIPA ACTUAL'+activeTeam);
				//alert('SCORE'+oldScore);
				$('audio').stop();

				$('.score_result').css('display','none');

				$('.ooohhh-n3').fadeIn(500,function(){

						switch(activeTeam){
							case "A" 	:{
									 		$('.score_result_A').css('display','block');
									 		$('.score_result_A span').html(oldScore);
										} break;


							case "B" 	:{
									 		$('.score_result_B').css('display','block');
									 		$('.score_result_B span').html(oldScore);
										} break;

							case "C" 	:{
									 		$('.score_result_C').css('display','block');
									 		$('.score_result_C span').html(oldScore);
										} break;


							case "D" 	:{
									 		$('.ooohhh-n3').css("pointer-events","none");
											$('.ooohhh-n3').css('padding-top','83px');
									 		$('.score_result_A').css('display','block');
									 		$('.score_result_B').css('display','block');
									 		$('.score_result_C').css('display','block');
									 		$('.score_result_D').css('display','block');
									 		$('.score_result_D span').html(oldScore);
										} break;

						}

				
						$('.area-jogo').fadeOut();

					//alert('acabou o jogo');
				});

				/*AQUI*/
			}, 2000);
		}
	} else {

		$('.'+targetShowScore+' span').html(oldScore);

		$('.som-falhou')[0].play();

		$('.r-'+escolha).addClass('r-'+escolha+'-errado');

		$('.r-'+certa).addClass('r-'+certa+'-certo');

		if(ajudas==0){
			setTimeout(function(){


				$('audio').stop();

				$('.score_result').css('display','none');

				$('.ooohhh-n3').fadeIn(500,function(){

						switch(activeTeam){
							case "A" 	:{
									 		$('.score_result_A').css('display','block');
									 		$('.score_result_A span').html(oldScore);
										} break;


							case "B" 	:{
									 		$('.score_result_B').css('display','block');
									 		$('.score_result_B span').html(oldScore);
										} break;

							case "C" 	:{
									 		$('.score_result_C').css('display','block');
									 		$('.score_result_C span').html(oldScore);
										} break;


							case "D" 	:{
									 		$('.ooohhh-n3').css("pointer-events","none");											
											$('.ooohhh-n3').css('padding-top','83px');
									 		$('.score_result_A').css('display','block');
									 		$('.score_result_B').css('display','block');
									 		$('.score_result_C').css('display','block');
									 		$('.score_result_D').css('display','block');
									 		$('.score_result_D span').html(oldScore);
										} break;

						}

				
						$('.area-jogo').fadeOut();

					//alert('acabou o jogo');
				});

				/*AQUI*/
			}, 2000);
		}
	}
}

}

function chooseAnswer(answer){

	clearInterval(ticker);
	//console.log(nivel);
	//alert(answer);
	//console.log('a resposta e '+answer);
	console.log(actualQuestion);
	//alert($('#countdown').get(0).contents());
	$('#selectedAnswer').val('1');
	var answerTime= parseInt($('#timer_play').val());

	//console.log('a resposta certa é:'+actualQuestion.r_certa);

	$('.r-'+answer).addClass('r-'+answer+'-block');
	$('.som-bloqueou')[0].play();

	$('.respostas li').css('pointer-events','none');
	//$('.respostas li').click(function(){return false;});
	escolha = answer;
	certa=actualQuestion.r_certa;




}

function getHelp(){

	//alert(answer);

	if(ajudas>0){
		//alert(ajudas);
			ajudas--;
		$('.respostas li').css('pointer-events','auto');

		if(ajudas ==2){
			$('.ajuda-1').attr('src','images/vidaUsada.png')
		}

		if(ajudas ==1){
			$('.ajuda-2').attr('src','images/vidaUsada.png')
		}

		if(ajudas ==0){
			$('.ajuda-3').attr('src','images/vidaUsada.png')
		}

	
		mostraPergunta();
	} else {
		//alert('Não há mais ajudas');
	}
}


function shuffle(array) {
  	var currentIndex = array.length, temporaryValue, randomIndex;

  	while (0 !== currentIndex) {
    	randomIndex = Math.floor(Math.random() * currentIndex);
    	currentIndex -= 1;

    	temporaryValue = array[currentIndex];
    	array[currentIndex] = array[randomIndex];
    	array[randomIndex] = temporaryValue;
  	}

  	return array;
}

function newTeam(){
	//alert('newteam');

	if($('#active_team').val()=="A"){
		$('.score-a').css('background','url(images/equipa_a_off.png)');
		$('#active_team').val("B");
		$('.score-b').css('background','url(images/equipa_b_on.png)');

		nextTeam="B";

	} else 

	if($('#active_team').val()=="B"){
		$('.score-b').css('background','url(images/equipa_b_off.png)');

		$('#active_team').val("C");
		$('.score-c').css('background','url(images/equipa_c_on.png)');

		nextTeam="C";


	} else 

	if($('#active_team').val()=="C"){
		$('.score-c').css('background','url(images/equipa_c_off.png)');

		$('#active_team').val("D");
		$('.score-d').css('background','url(images/equipa_d_on.png)');

		nextTeam="D";

	}

	


	 ajudas = 3;
	 nivel =0;
	 round =1;

	 escolha;
	 certa;
	 pronto=0;



	$('.ooohhh-n3').fadeOut();
	$('.ooohhh').fadeOut();
	$('.parabens-n6').fadeOut();
	$('.area-jogo').fadeIn();
	$('.ajuda-1, .ajuda-2, .ajuda-3').attr('src','images/vida.png');
	$('.n1').attr('src','images/n1.png');
	$('.n2').attr('src','images/n2.png');
	$('.n3').attr('src','images/n3.png');
	$('.n4').attr('src','images/n4.png');
	$('.n5').attr('src','images/n5.png');
	$('.n6').attr('src','images/n6.png');
	$('.gestao-niveis img').attr('src','images/progresso_0.png');


	mostraPergunta();

}