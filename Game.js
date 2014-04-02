var board = []; 
var player1, player2,current_player, other_player = {};
var running = false;
var winner = 0;
var status_message = "";
var game_type = "";
var turnoak1=1;
var turnoak2=1;
var puntuazioa1 = 0;
var triple1 = 0;
var doble1 = 0;
var puntuazioa2 = 0;
var triple2 = 0;
var doble2 = 0;

var player = function(index,type) {
	this.playerindex = index;
	this.playertype = type;
	
};

var do_move = function(board,row,column) {
	if(running == true && check_valid_move(board,row,column)==true) {
	var row_to_fill = determine_drop_position(board,row,column);
	
	NewRenderer.Renderboard(board,row_to_fill,column,current_player.playerindex);
	set_board(board,row_to_fill,column,current_player.playerindex);
	
	if(determine_if_winner_exists(board,parseInt(row_to_fill),parseInt(column),current_player.playerindex)==false)
	{	
	current_player = change_player(current_player);
	do_next_move();		
	}
	
	$('.status').html(status_message);
	}
	};

function do_next_move() {
	if(current_player.playertype=="Computer" && running == true) {
	bot_move = do_bot_move(board,current_player.playerindex);
	do_move(board,bot_move[1],bot_move[0],current_player.playerindex);
	
	}
};

function check_valid_move(board,row,column) {
	if(board[row][column].occupied == true) {
    status_message = "Badago fitxa bat lehendik kasilla horretan.";
	return false;
    } else {
    status_message = "Your move will be executed player " + current_player.playerindex;
	return true;
    }
}

function determine_drop_position(board,row,column) {
    if(game_type=="Traditional")
	{
	for(k=0;k<10;k++) {
    if(board[k][column].occupied == true) { break; }
    }
    return k-1;
	}
	else if(game_type=="Drop_anywhere")
	{
	return row;	
	}
}

function set_board(board,row,column,playerindex) {
    board[row][column].occupied = true;
    board[row][column].by = playerindex;
}

function change_player(current_player) {
  if (current_player == player1 && winner != current_player.playerindex) {
  	current_player = player2;
	other_player = player1; }
	else { current_player = player1; other_player = player2;}
	status_message = "Jokalaria:  " + current_player.playerindex + " (" + current_player.playertype + ") mesedez mugitu fitxa."
	return current_player;
}

function determine_if_winner_exists(board,row,column,playerindex) {
var right = 0;
var left = 0;
var top = 0;
var down = 0;
var right_top = 0;
var right_down = 0;
var left_top = 0;
var left_down = 0;

for(var i = 1;i<4;i++) {
	if(row-i<0) {break; }
    if (board[row-i][column].by == playerindex) { top++; }
	else { break; }
}

for(var i = 1;i<4;i++) {
	if(column-i<0) {break; }
	if (board[row][column-i].by == playerindex) { left++; }

	else { break; }
}

for(var i = 1;i<4;i++) {
	if(column+i>9) {break; }
	if(board[row][column+i].by == playerindex) { right++; }

	else { break; }
}

for(var i = 1;i<4;i++) {
	if(row+i>9) {break; }
	if (board[row+i][column].by == playerindex) { down++; }

	else { break; }
}



for(var i = 1;i<4;i++) {
	if(row-i<0 || column+i>9) {break; }
	if (board[row-i][column+i].by == playerindex) { right_top++; }
	else { break; }
}

for(var i = 1;i<4;i++) {
	if(row-i<0 || column-i<0) {break; }
	if (board[row-i][column-i].by == playerindex) { left_top++; }
	else { break; }
}

for(var i = 1;i<4;i++) {
	if(row+i>9 || column+i>9) {break; }
	if (board[row+i][column+i].by == playerindex) { right_down++; }
	else { break; }
}

for(var i = 1;i<4;i++) {
	if(row+i>9 || column-i<0) {break; }
	if (board[row+i][column-i].by == playerindex) { left_down++; }
	else { break; }
}

var total_horizontal = left + right + 1;
var total_vertical = top + down + 1;
var total_diagonal_1 = left_top + right_down + 1;
var total_diagonal_2 = right_top + left_down + 1;

if(total_horizontal > 3 || total_vertical > 3 || total_diagonal_1 > 3 || total_diagonal_2 > 3) { 
	running = false; 
	winner = playerindex; 

	puntuazioa1 = (turnoak1*200) + (triple1*3000) + (doble1*500);
	puntuazioa2 = (turnoak2*200) + (triple2*3000) + (doble2*500);
	if (current_player == player1){
		puntuazioa1 = puntuazioa1 + 20000;
	}else{
		puntuazioa2 = puntuazioa2 + 20000;
	}
	
	status_message="Irabazlea dago. " + winner + " jokalariak irabazi du! <button onclick=location.reload(true)>Hasi Joko berria!</button> Puntuazioa Player 1 ="+puntuazioa1+"|Puntuazioa Player 2 ="+puntuazioa2;
	$('.status').html(status_message);
	return true;
} else {
	
	if (current_player == player1){
		turnoak1 ++;
		if(total_horizontal == 3){ 
			triple1 ++;
			doble1 --;
		}
		if  (total_vertical == 3 ){
			triple1 ++;
			doble1 --;
		} 
		if(total_diagonal_1 == 3 ){
			triple1 ++;
			doble1 --;
		}
		if (total_diagonal_2 == 3){
			triple1 ++;
			doble1 --;
		}
		if(total_horizontal == 2){ 
			doble1 ++;
		}
		if  (total_vertical == 2 ){
			doble1 ++;
		} 
		if(total_diagonal_1 == 2 ){
			doble1 ++;
		}
		if (total_diagonal_2 == 2){
			doble1 ++;
		}
	}else{
		turnoak2 ++;
		if(total_horizontal == 3){ 
			triple2 ++;
			doble2 --;
		}
		if  (total_vertical == 3 ){
			triple2 ++;
			doble2 --;
		} 
		if(total_diagonal_1 == 3 ){
			triple2 ++;
			doble2 --;
		}
		if (total_diagonal_2 == 3){
			triple2 ++;
			doble2 --;
		}
		if(total_horizontal == 2){ 
			doble2 ++;
		}
		if  (total_vertical == 2 ){
			doble2 ++;
		} 
		if(total_diagonal_1 == 2 ){
			doble2 ++;
		}
		if (total_diagonal_2 == 2){
			doble2 ++;
		}
	}
	return false;
	
}

};