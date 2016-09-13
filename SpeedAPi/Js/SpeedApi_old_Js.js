// start of 判別輸入 顯示正確輸出-----------------------------------------------------------------------
    	// parseInt : string to int
    	var moment ; // 上下午
    	var hours ; //小時
    	var minutes; //分鐘
    	var seconds ; //秒
    	var word = final_transcript ;

    	var point = parseInt(word.indexOf("點")) ; //點的位置
    	var fen = parseInt(word.indexOf("分")) ; // 分的位置
    	var h = parseInt(word.indexOf("小時")) ; //小時的位置
    	

    	//修改讀音錯字-----------------------------------------------------------------------------------------------	

    	var currentText = {吳:'5',一:'1',二:'2',三:'3',四:'4',五:'5',六:'6',七:'7',八:'8',九:'9',十:'10',兩:'2',候:'後',半:"30"} ;
    	word = word.replace(/吳|一|二|三|四|五|六|七|八|九|十|兩|候|半/gi,function(matched){
  			return currentText[matched];
		}) ;
		//-----------------------------------------------------------------------------------------------------------
		var late = word.indexOf("後") ;  // 後的位置
		var early = word.indexOf("前") ; // 前的位置

    	if(late != -1){     // 多久時間後
    		var nowTime = new Date() ;
    		var plusHours = 0 ;
    		//計算分鐘-----------------------------------------------------------------------------------------------------------
    		if(word.indexOf("分") != -1){
    			var minutesWhere = 0 ;
    			for(var i = h ; (!parseInt(word[i])) ; i++){
    				minutesWhere++ ;
    			}
    			minutes = parseInt(word.substring( (h+minutesWhere) ,fen )) + nowTime.getMinutes()  ;
    			if(minutes > 60){
    				if(word.indexOf("小時") != -1){
    					plusHours = Math.floor(minutes/60) ; // 多加幾個小時
    					minutes = (minutes%60) + "分" ;
    				} else {
    					minutes = (nowTime.getHours()+Math.floor(minutes/60))+"點"+ minutes%60 +"分" ;
    				}
    			} else {
    				minutes = minutes + "分" ;
    			}
    		}
    		else {
    			minutes = nowTime.getMinutes() + "分" ;
    		}

    		//計算小時-----------------------------------------------------------------------------------------------------------
    		if(word.indexOf("小時") != -1){
    			hours = parseInt(word.substring(0,word.indexOf("小時"))) + nowTime.getHours()+ plusHours ;
    			 
    			var day = Math.floor(hours/24) ; //正整數
    			if(hours == 12) hours = "下午" + hours + "點" +" " ;
    			else if(hours > 24){

    				if((hours%24) == 12 )hours = "過了" + day + "天的下午12點" +" " ;
    				else if((hours%24) > 12)hours = "過了" + day + "天的下午" + (hours%24 - 12) + "點"  +" ";
    				else hours =  "過了" + day + "天的上午" + (hours%24) + "點" +" " ;  
    			} 
    			else if(hours > 12)hours = "下午" + (hours-12) + "點" +" " ;
    			else hours = "上午" + hours + "點" ;
    		}
    		else if( (word.indexOf("小時") == -1) && (word.indexOf("分") != -1) ){
    			hours = "" ;
    		}
    		else {
    			hours = nowTime.getHours() + "點" ;
    		}


	    	word = hours + minutes ;
	    } 
	    //else if(early){  //多久時間前

	    //}
	    else {

	    	// start of 上下午幾點幾分--------------------------------------------------------------------------------

	    	if(point > 2){     // 判斷是否有上下午
	    		moment = word.substring(0,2) ;

	    		if(moment == "凌晨" || moment == "早上")moment = "上午" ; // 使上下午一致
	    		else if(moment == "晚上")moment = "下午" ;
	    		else moment = "" ;

	    		if(fen != -1)fen=  word.substring(point+1 , fen) + " " + "分" ; // 判斷是否有'分'
	    		if(point != -1)point =  (word.substring(2,point)) + " " + "點" ; // 判斷是否有'點'

	    		word = moment +" " + point + " " + fen  ;
	    	} else {          // 沒有上下午

	    		if(fen != -1){
	    			fen=  word.substring(point+1 , fen) + " " + "分" ; // 判斷是否有'分'
	    		} else if(fen == -1){  //沒有顯示"分" 但有分鐘 EX 9點18
					if(point+1 < word.length ){
						fen=  word.substr(point+1 ,word.length - (point+1)) + " " + "分" ; 
					} else fen = "" ; //完全沒有分鐘
	    		}
	    		if(point != -1)point =  (word.substring(0,point)) + " " + "點" ; // 判斷是否有'點'

	    		word =  point + " " + fen  ;
	    	}

	    	//end of of 上下午幾點幾分--------------------------------------------------------------------------------

	    }
    	

    	// end of 判別輸入 顯示正確輸出-------------------------------------------------------------------------