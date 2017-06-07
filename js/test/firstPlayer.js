	$scope.player2 = {
		default_color: 'red',
		team: 	1,
		jersey_number: 14,
		default_shadow: 'none',
		current_style:  { 	top:		"120px",
							left:		"120px",
					'background-color': 	'#ff0000',
			},
		frames: [	{ 	posX: "10",	posY: "5" }, 
					{ 	posX: "7",	posY: "7", highlighted: true}, 
					{ 	posX: "8",	posY: "2", highlighted: false }, 
					{ 	posX: "9",	posY: "7" }, 
					{ 	posX: "3",	posY: "4" }
			] ,
		transitionTo:	function(index){
				if ( this.frames[index].highlighted == true ){
					console.log('%c true value found for highlighted', 'color:red');
					console.log('this.highlighted = ' + this.frames[index].highlighted);
					this.calculated_color = this.default_color ;
//					this.calculated_shadow = "0px 0px 20px 6px rgba(255, 0, 0, 1)"
					this.calculated_shadow = "0px 0px 20px 6px "+ this.default_color;
				} else {
					this.calculated_color = this.default_color;
					this.calculated_shadow = this.default_shadow;
				}
				this.current_style= {
						top: ( this.frames[index].posY * 40 ) + "px",
						left: ( this.frames[index].posX * 40 ) + "px",
						'background-color': this.calculated_color,
						'box-shadow': this.calculated_shadow,
						//add more dialects
						//'border': ( this.frames[index].highlighted == true ? '1px solid #38cc24' : "1 px solid transparent" )
						'border': "1 px solid transparent", 
					}
			}
		
	}

