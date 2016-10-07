
 // 88  88 888888 88     8888o. 888888 8888o.    888888 88  88 8888o. .o8888 888888 88 .o88o. 8888o. .o8888 
 // 88  88 88     88     88  88 88     88  88    88     88  88 88  88 88       88   88 88  88 88  88 88     
 // 888888 8888   88     8888Y' 8888   8888Y'    8888   88  88 88  88 88       88   88 88  88 88  88 'Y88o. 
 // 88  88 88     88     88     88     88  88    88     88  88 88  88 88       88   88 88  88 88  88     88 
 // 88  88 888888 888888 88     888888 88  88    88     'Y88Y' 88  88 'Y8888   88   88 'Y88Y' 88  88 8888Y' 

var __VERBOSE__ = true;
var first_word = "";
var second_word = "";
var appearances = [];
var master_list = [];
var uniques = [];
var temp = {};
var individual_counts = {}

var model = {
	first_word:"",
	second_word: "",
	appearances: [],
	master_list: [],
	array_of_words: [],
	uniques: [],
	temp: {},
	individual_counts: {},
	debug: true,
	print_for_debug: 		function print_for_debug(a_string){
			if(__VERBOSE__){
				console.log(a_string);
			}
		},
	count_of: function count_of(input_word){
			if(input_text.indexOf(input_word)>-1){
				return (input_text.split(input_word).length - 1);
			}
		},
	getAllIndexes: 		function getAllIndexes(arr, val) {
		    var indexes = [], i;
		    for(i = 0; i < arr.length; i++)
		        if (arr[i] === val)
		            indexes.push(i);
		    return indexes;
		},
	get_max_dictionary_value:	function get_max_dictionary_value(dictionary){
			var key_of_largest_item = "";
			var second_key_of_largest_item = "";
			var largest_value = 0;
			for(var key in dictionary){
				if(dictionary[key]>largest_value){
					largest_value = dictionary[key];
					key_of_largest_item=key;
				}else if(dictionary[key]==largest_value){
					// we have a tie
					second_key_of_largest_item=key;
				}
			}
			if(second_key_of_largest_item.length>0 && Math.random()<0.5){
				return second_key_of_largest_item;
			}
			return key_of_largest_item;
		},
	train: function train_model(input_text,debug){

		__VERBOSE__ = debug;

		input_text = input_text.toLowerCase().replace(",","").replace(".","").replace("!","").replace(".","").replace("'","");

		function print_for_debug(a_string){
			if(__VERBOSE__){
				console.log(a_string);
			}
		}

		function count_of(input_word){
			if(input_text.indexOf(input_word)>-1){
				return (input_text.split(input_word).length - 1);
			}
		}
		function getAllIndexes(arr, val) {
		    var indexes = [], i;
		    for(i = 0; i < arr.length; i++)
		        if (arr[i] === val)
		            indexes.push(i);
		    return indexes;
		}
		function get_max_dictionary_value(dictionary){
			var key_of_largest_item = "";
			var second_key_of_largest_item = "";
			var largest_value = 0;
			for(var key in dictionary){
				if(dictionary[key]>largest_value){
					largest_value = dictionary[key];
					key_of_largest_item=key;
				}else if(dictionary[key]==largest_value){
					// we have a tie
					second_key_of_largest_item=key;
				}
			}
			if(second_key_of_largest_item.length>0 && Math.random()<0.5){
				return second_key_of_largest_item;
			}
			return key_of_largest_item;
		}


		this.array_of_words = input_text.split(" ");

		print_for_debug(this.array_of_words);

		for(var i=0; i<this.array_of_words.length; i++){
			// Clean up input text
			if(!this.uniques.includes(this.array_of_words[i])){
				this.uniques.push(this.array_of_words[i]);
			}
		}

		print_for_debug("uniques "+this.uniques);

		// generate probabilities

		for(var j=0; j<this.uniques.length; j++){
			individual_counts[this.uniques[j]] = count_of(this.uniques[j]);
		}


		for(var k=0; k<this.uniques.length; k++){
			temp = {};
			first_word=this.uniques[k];
			print_for_debug(first_word);
			appearances = getAllIndexes(this.array_of_words,first_word);
			for(var z=0;z<appearances.length;z++){
				second_word = this.array_of_words[appearances[z]+1];
				print_for_debug("    "+second_word);
				temp[second_word] = (count_of(first_word+" "+second_word)/count_of(first_word));
			}
			master_list.push([first_word,temp]);

		}
		this.word_model = master_list;
		this.master_list = master_list;
		return this;
	},
	word_model: [],
	generate: 	function generate(output_length){
			var master_string = this.uniques[Math.floor(Math.random()*this.uniques.length)];
			var temp_word = master_string;
			var old_word = "";
			console.log("temp_word: "+temp_word);
			for(var q=0;q<output_length-1;q++){
				this.print_for_debug(this.word_model[this.uniques.indexOf(temp_word)][1]);
				old_word = temp_word;
				theoretical_next_word=this.get_max_dictionary_value(this.word_model[this.uniques.indexOf(temp_word)][1]);
				if(theoretical_next_word.length==0){
					// select a random word
					theoretical_next_word = this.uniques[Math.floor(Math.random()*this.uniques.length)]
				}
				this.print_for_debug("temp_word set to: '"+ theoretical_next_word);
				temp_word=theoretical_next_word;
				master_string = master_string + " " + temp_word;
				this.print_for_debug("master_string: "+master_string);
			}
			return master_string;
		},
	finish_sentence: function finish_sentence(phrase,output_length){
		var master_string = phrase;
		var temp_word = master_string.split(" ")[master_string.split(" ").length-1];
		var old_word = "";
		console.log("temp_word: "+temp_word);
		for(var q=0;q<output_length-1;q++){
			this.print_for_debug(this.word_model[this.uniques.indexOf(temp_word)][1]);
			old_word = temp_word;
			theoretical_next_word=this.get_max_dictionary_value(this.word_model[this.uniques.indexOf(temp_word)][1]);
			if(theoretical_next_word.length==0){
				// select a random word
				theoretical_next_word = this.uniques[Math.floor(Math.random()*this.uniques.length)]
			}
			this.print_for_debug("temp_word set to: '"+ theoretical_next_word);
			temp_word=theoretical_next_word;
			master_string = master_string + " " + temp_word;
			this.print_for_debug("master_string: "+master_string);
		}
		return master_string;
	}
}

