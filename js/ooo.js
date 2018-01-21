// 城市地址
let citys,weatherobj;

$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	success:function(obj){
		citys=obj.data;
		console.log(citys);
		for(let i in citys){
			// console.log(i);
			let section=document.createElement('section');//创建元素
			let citys_title=document.createElement('h1');
			citys_title.className="citys_title";
			citys_title.innerHTML=i;
			section.appendChild(citys_title);//确定关系
			for(let j in citys[i]){
				let list=document.createElement('ul');
				list.className="list";
				let li=document.createElement('li');
				li.innerHTML=j;
				list.appendChild(li);
				section.appendChild(list);
			}


			$(".citys_box").append(section);
		}
	}
})

$.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
     // getFullWeather(remote_ip_info.city);
     getFullWeather("Where");
});
// 获取当前天气信息
function getFullWeather(nowcity){
	$(".now_city").html(nowcity);
	// 获取当前城市天气信息
	$.ajax({
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
		dataType:"jsonp",
		success:function(obj){
			weatherobj=obj.data;
			console.log(weatherobj);
			// 当前空气质量
			$(".now_air_quality").html(weatherobj.weather.quality_level);
			$(".now_temp_temp").html(weatherobj.weather.current_temperature);
			$(".now_wind").html(weatherobj.weather.wind_direction);
			$(".now_wind_level").html(weatherobj.weather.wind_level+"级");

			// 近期两天的天气状况
			// 今天的温度
			$(".today_max").html(weatherobj.weather.dat_high_temperature);
			$(".today_min").html(weatherobj.weather.dat_low_temperature);
			$(".today_weather").html(weatherobj.weather.dat_condition);
			$(".today_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");
			$(".tomorrow_max").html(weatherobj.weather.tomorrow_high_temperature);
			$(".tomorrow_min").html(weatherobj.weather.tomorrow_low_temperature);
			$(".tomorrow_img").attr('src',"img/"+weatherobj.weather.tomorrow_weather_icon_id+".png");
			$(".tomorrow_weather").html(weatherobj.weather.tomorrow_condition);

			// 未来24小时
			let hours_array=weatherobj.weather.hourly_forecast;
			for(let i=0;i<hours_array.length;i++){
				let hours_list=document.createElement('li');
				
				let hours_time=document.createElement('span');
				hours_time.className='hours_time';

				let hours_img=document.createElement('img')
				hours_img.className='hours_img';

				let hours_temp=document.createElement('span')
				hours_temp.className='hours_temp';

				hours_list.appendChild(hours_time);
				hours_list.appendChild(hours_img);
				hours_list.appendChild(hours_temp);

				$('.hours_content').append(hours_list);


				// 当下时间
				hours_time.innerHTML=hours_array[i].hour+":00";
				hours_img.setAttribute('src',"img/"+hours_array[i].weather_icon_id+".png");
				hours_temp.innerHTML=hours_array[i].temperature+"℃";
			}
				// 未来一周
			let weeks_array=weatherobj.weather.forecast_list;
			for(let i=0;i<weeks_array.length;i++){
				let weeks_list=document.createElement('li');

				let weeks_time=document.createElement('span');
				weeks_time.className='weeks_time';

				let weeks_img=document.createElement('img')
				weeks_img.className='weeks_img';

				let weeks_temp_max=document.createElement('span')
				weeks_temp_max.className='weeks_temp_max';

				let weeks_temp_min=document.createElement('span')
				weeks_temp_min.className='weeks_temp_min';

				let weeks_wind=document.createElement('span')
				weeks_wind.className='weeks_wind';

				let weeks_jishu=document.createElement('span')
				weeks_jishu.className='weeks_jishu';






				weeks_list.appendChild(weeks_time);
				weeks_list.appendChild(weeks_img);
				weeks_list.appendChild(weeks_temp_max);
				weeks_list.appendChild(weeks_temp_min);
				weeks_list.appendChild(weeks_wind);
				weeks_list.appendChild(weeks_jishu);

				$('.weeks_content').append(weeks_list);

				weeks_time.innerHTML = weeks_array[i].date.substring(5,7)+"/"+weeks_array[i].date.substring(8);
				weeks_img.setAttribute('src',"img/"+weeks_array[i].weather_icon_id+".png");
				weeks_temp_max.innerHTML=weeks_array[i].high_temperature+"℃";
				weeks_temp_min.innerHTML=weeks_array[i].low_temperature+"℃";
				weeks_wind.innerHTML=weeks_array[i].wind_direction+"";
				weeks_jishu.innerHTML=weeks_array[i].wind_level+"级";
			}
		}
	})	
}


$(function(){
	$(".now_city").on("click",function(){
		$(".citys").css("display","block");
		// 显示、隐藏
	})


	$("body").delegate('.list li', 'click', function() {
		let son = this.innerHTML;
		getFullWeather(son);
		$(".citys").css("display","none");
	})

	$("body").delegate('.citys_title', 'click', function() {
		let son = this.innerHTML;
		getFullWeather(son);
		$(".citys").css("display","none");
	})


	$(".search").on("focus",function(){
		$(".confirm").html('确认');
	})

	
	$(".confirm").on("click",function(){
		if($(".confirm").html()=="取消"){
			$(".citys").css("display","none");

		}else if(this.innerText=="确认"){
			let text=$(".search").val();
			for(let i in citys){
				if (text==i){
					getFullWeather(text);
					$(".citys").css("display","none");
					return;
				}else{
						for(let j in citys[i]){
							if(text == j){
								getFullWeather(text);
								$(".citys").css("display","none");
								return;
							}
						}
					}
				}
				alert('输入地区有误');
				$(".search").val("");
				$(".cancel").html('取消');
		}
	})

})


// window.onload=function(){

// }




























































