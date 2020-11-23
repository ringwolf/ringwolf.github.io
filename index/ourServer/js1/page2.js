new Vue({
	el: '#page2',
	data: {
		url: 'http://api.globalinsp.com/',
		mapLineArr: [],
		worldMap1: null,
		orderList: [],
		zhoren:localStorage.getItem("locale") || "zh",
		leftData: [],
		rightData: [],
		chinaData: [],
		echartsList: {
			echarts1: null,
			echarts2: null,
			echarts3: null,
			echarts4: null,
			echarts5: null,
			echarts6: null,
		},
		user_count: [],
		orders_count: [],
		orders_ordersStatus: '',
		userMap_count: [],
		lastSum: 0,
		Count: "000000",
		mapShowType:'world',
		current_date: '按日期查看',
		select_value: '',
		select_type:'inspect_time',
		filter: {
			select_type: "",
			select_value: "",
			country: "",
			province: "", //点击的省份
		},

	},
	methods: {
		//窗口全屏方法
		windowFull() {
		  var el = document.documentElement;
		  var rfs =
		    el.requestFullScreen ||
		    el.webkitRequestFullScreen ||
		    el.mozRequestFullScreen ||
		    el.msRequestFullscreen;
		  if (typeof rfs != "undefined" && rfs) {
		    rfs.call(el);
		  }
		  return;
		},
		upload_data:function(){
			this.mapShowType = 'world'
			this.select_type = ''
			this.select_value = ''
			this.filter.country = ''
			this.filter.province = ''
			this.get_bigData()
			this.get_right_data()
		},
		today_order:function(){
			this.select_type='add_time'
			this.get_current_date()
		},
		today_yh:function(){
			this.select_type='inspect_time'
			this.get_current_date()
		},
		get_bigData:function() {
			var that = this
			if (this.select_value == '') {
				that.select_type = ''
				that.select_value = ''
			}
			$.ajax({
				url: 'http://api.globalinsp.com/api/u_is/bigData',
				data: {
					select_type: that.select_type,
					select_value: that.select_value,
					country: that.filter.country,
					province: that.filter.province
				},
				type: "POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				success: function(data) {
					data.data.orderList.forEach((item, index) => {
						that.mapLineArr.push(item.map);
					});
					data.data.orderList = data.data.orderList.slice(0,20)
					that.leftData = data.data
					for (var i in data.data.orderList) {
						if(data.data.orderList[i].name){
							data.data.orderList[i].name = data.data.orderList[i].name.slice(0, 1) + '***';
						}
						
						if(data.data.orderList[i].product[0]){
							data.data.orderList[i].product[0] = data.data.orderList[i].product[0].slice(0, 2) + '...'
						}
					}
					that.orderList = data.data.orderList
					that.khdyff_List = data.data.userMap
					that.leftData.todayOrderCount = data.data.todayOrderCount.toString();
					that.leftData.todayInspCount = data.data.todayInspCount.toString();
					that.leftData.orderCount = data.data.orderCount.toString();
					that.user_count = data.data.user.count.toString();
					that.orders_count = data.data.orders.count.toString();
					that.leftData.operationTime = data.data.operationTime.toString();
					that.userMap_count = data.data.userMap.count.toString();
					that.orders_ordersStatus = data.data.orders.ordersStatus
					console.log(that.leftData.todayOrderCount,that.leftData.todayInspCount)

					that.$nextTick(() => {
						setTimeout(function() {
							that.set_khdyfbzb_data()
							that.createMapLine();
						}, 500)
					});

				},
			})
		},
		get_right_data:function() {
			var that = this
			if (this.select_value == '') {
				that.select_type = ''
				that.select_value = ''
			}
			$.ajax({
				url: 'http://api.globalinsp.com/api/u_is/distribution',
				data: {
					select_type: that.select_type,
					select_value: that.select_value,
					country: that.filter.country,
					province: that.filter.province
				},
				type: "POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				success: function(data) {
					that.rightData = data.data
					that.rightData.inspectorMapCount = data.data.inspectorMapCount.toString();
					that.rightData.orderMapCount = data.data.orderMapCount.toString();

					that.$nextTick(() => {
						setTimeout(function() {
							that.set_yhydyfb_data()
							that.set_ddfgqy_data()
							that.set_yhlx_data()
						}, 2000)
					});

					that.chinaData = that.rightData.inspectorMap.map((item) => {
						return {
							name: item.province,
							value: item.count,
						};
					});

					that.$nextTick(function() {
						setTimeout(function() {
							that.createChinaMap(); //中国地图
						}, 2000);
					});


				},
			})
		},

		get_current_date:function() {
			var date = new Date().toLocaleDateString();
			this.current_date = date
			this.select_value = date
			this.get_right_data()
			this.get_bigData()
		},

		add_oneday:function() {
			if (this.select_value) {
				this.current_date = this.date_add(this.current_date)
				this.select_value = this.date_add(this.current_date)
				this.get_right_data()
				this.get_bigData()
			}
		},

		reduice_oneday:function() {
			if (this.select_value) {
				this.current_date = this.date_reduice(this.current_date)
				this.select_value = this.date_reduice(this.current_date)
				this.get_right_data()
				this.get_bigData()
			}
		},

		// 日期控制
		date_reduice:function(date) {
			var startTime = new Date(date).getTime() - 1000 * 60 * 60 * 24; //减去一天
			var startYear = new Date(startTime).getFullYear(); //获取新的日期的年份
			var startMonth = new Date(startTime).getMonth() + 1; //获取月份
			var startDay = new Date(startTime).getDate(); //获取天
			var new_date = startYear + '-' + Appendzero(startMonth) + '-' + Appendzero(startDay)
			return new_date

			function Appendzero(obj) { //添0操作
				{
					if (obj < 10) {
						return "0" + "" + obj;
					} else {
						return obj;
					}
				}
			}
		},

		// 日期控制
		date_add:function(date) {
			var startTime = new Date(date).getTime() + 1000 * 60 * 60 * 24; //减去一天
			var startYear = new Date(startTime).getFullYear(); //获取新的日期的年份
			var startMonth = new Date(startTime).getMonth() + 1; //获取月份
			var startDay = new Date(startTime).getDate(); //获取天
			var new_date = startYear + '-' + Appendzero(startMonth) + '-' + Appendzero(startDay)
			return new_date

			function Appendzero(obj) { //添0操作
				{
					if (obj < 10) {
						return "0" + "" + obj;
					} else {
						return obj;
					}
				}
			}
		},


		//地图飞线展示
		createMapLine:function() {
			var that = this;
			var checkedAColor = ["#ffc4ba", "#ff7452", "#FF2D54", "#ff0007"];
			var checkedColor = checkedAColor[0];
			that.worldMap1 = echarts.init(this.$refs.word_echarts1);
			var option = null;
			// var routes = mapDot.arr1;
			
			var routes = this.mapLineArr
			var regions = that.leftData.userMap.list.map((item) => {
				if (item.count < 10) {
					checkedColor = checkedAColor[0];
				} else if (item.count > 10 && item.count < 100) {
					checkedColor = checkedAColor[1];
				} else if (item.count > 100 && item.count < 1000) {
					checkedColor = checkedAColor[2];
				} else if (item.count > 1000) {
					checkedColor = checkedAColor[3];
				}
				return {
					name: item.country_en,
					itemStyle: {
						color: checkedColor,
					},
				};
			});

			that.worldMap1.setOption({
				geo3D: {
					map: "world",
					shading: "realistic",
					silent: false,
					top: 30,
					environment: "#00023a",
					realisticMaterial: {
						roughness: 0.8,
						metalness: 0,
					},
					itemStyle: {
						color: "#0079fa",
						opacity: 0.5,
						borderWidth: 0,
						borderColor: "#73d2f2",
					},
					postEffect: {
						enable: false,
						bloom: {
							enable: false,
						},
						colorCorrection: {
							enable: false,
						},
						SSAO: {
							enable: false,
						},
					},
					groundPlane: {
						show: false,
					},
					light: {
						main: {
							intensity: 1,
							alpha: 30,
						},
						ambient: {
							intensity: 0,
						},
					},
					emphasis: {
						label: {
							show: true,
							formatter: function(e) {
								var countryNum = that.leftData.userMap.list.filter(
									(item) => item.country_en === e.name
								);
								if (countryNum && countryNum.length > 0)
									return e.name + ": " + (countryNum[0].count || 0);
								else {
									return e.name + ": 0";
								}
							},
							textStyle: {
								fontSize: 14,
							},
						},
						itemStyle: {
							color: "#ED5400",
						},
					},
					regions,

					viewControl: {
						distance: 70,
						alpha: 89,
						panSensitivity: 0,
						zoomSensitivity: 0,
						panMouseButton: "left",
						rotateMouseButton: "right",
					},

					regionHeight: 0.5,
				},
				series: [{
					type: "lines3D",

					coordinateSystem: "geo3D",
					postEffect: {
						enable: false,
					},
					effect: {
						show: true,
						trailWidth: 0.8,
						trailOpacity: 0.8,
						trailLength: 0.2,
						constantSpeed: 2,
					},
					blendMode: "lighter",
					lineStyle: {
						width: 0.5,
						opacity: 0,
						color: "#4694D6",
					},

					polyline: false,
					data: routes,
				}, ],
			});

			window.addEventListener("keydown", function() {
				that.worldMap1.dispatchAction({
					type: "lines3DToggleEffect",
					seriesIndex: 0,
				});
			});

			window.addEventListener("resize", function() {
				that.worldMap1.resize();
			});
			if (option && typeof option === "object") {
				that.worldMap1.setOption(option, true);
			}
		},

		//中国地图
		createChinaMap:function() {
			var that = this;
			var checkedAColor = ["#FFB3A6", "#EB5732", "#FF2D54", "#C3272B"];
			var checkedColor = checkedAColor[0];
			/*       if (that.chinaData.value < 10) {
			  checkedColor = checkedAColor[0];
			} else if (that.chinaData.value > 10 && that.chinaData.value < 100) {
			  checkedColor = checkedAColor[1];
			} else if (that.chinaData.value > 100 && that.chinaData.value < 1000) {
			  checkedColor = checkedAColor[2];
			} else if (that.chinaData.value > 1000) {
			  checkedColor = checkedAColor[3];
			} */

			try {
				that.echartsList.echarts6.dispose();
			} catch (e) {}
			that.echartsList.echarts6 = echarts.init(this.$refs.chinaMap);

			var checkedMap = that.chinaData.map((item) => {
				if (item.value < 10) {
					checkedColor = checkedAColor[0];
				} else if (item.value > 10 && item.value < 100) {
					checkedColor = checkedAColor[1];
				} else if (item.value > 100 && item.value < 1000) {
					checkedColor = checkedAColor[2];
				} else if (item.value > 1000) {
					checkedColor = checkedAColor[3];
				}
				return {
					name: item.name,
					itemStyle: {
						color: checkedColor,
					},
					emphasis: {
						itemStyle: {
							// color: "#1189FF"
							color: "#ED5400",
						},
						label: {
							show: true,

							textStyle: {
								show: true,
								color: "#01E9EF",
								fontSize: 14,
							},
						},
					},
					label: {
						show: false,
					},
				};
			});

			var option = null;
			option = {
				tooltip: {
					formatter: function(params, ticket, callback) {
						return params.name + ": " + (params.value || 0);
					}, //数据格式化
					backgroundColor: "rgba(255,255,255,.6)",
					textStyle: {
						color: "#333",
						fontSize: 14,
					},
				},
				geo: {
					map: "china",
					roam: false,
					zoom: 1,
					left: 0,
					right: 0,
					bottom: 0,
					top: 70,
					label: {
						show: false,
						textStyle: {
							color: "#01E9EF",
						},
					},
					itemStyle: {
						normal: {
							borderColor: "rgba(0, 0, 0, 0.2)",
							color: "#0555AA",
						},
					},
					postEffect: {
						enable: true,
					},

					emphasis: {
						label: {
							textStyle: {
								show: true,
								color: "#01E9EF",
								fontSize: 14,
							},
						},
						itemStyle: {
							//color: "#1189FF"
							color: "#ED5400",
						},
					},
					regions: checkedMap,
				},
				series: [{
					name: "信息量",
					type: "map",
					geoIndex: 0,
					data: that.chinaData.map((item) => {
						return {
							name: item.name,
							value: item.value,
						};
					}),
				}, ],
			};

			// that.echartsList.echarts6.on("mouseover", function(e) {
			// 	console.log(e);
			// });
			window.addEventListener("resize", function() {
				setTimeout(function() {
					that.echartsList.echarts6.resize();
				}, 500);
			});
			if (option && typeof option === "object") {
				that.echartsList.echarts6.setOption(option, true);
			}
		},

		//反转数据
		reviseArr:function(key) {
			return function(a, b) {
				return a[key] - b[key];
			};
		},

		// 验货员地域分布
		set_yhydyfb_data:function() {
			var that = this;
			var yData = [];
			if (this.zhoren === "zh") {
				yData = this.rightData.inspectorMap.map((item) => item.province);
			} else {
				yData = this.rightData.inspectorMap.map((item) => item.province_en);
			}
			try {
				that.echartsList.echarts3.dispose();
			} catch (e) {}

			that.echartsList.echarts3 = echarts.init(this.$refs.yhydyfb);
			var option = {
				tooltip: {
					trigger: "axis",
				},

				grid: {
					left: "3%",
					right: "4%",
					bottom: 0,
					top: 20,
					containLabel: true,
				},
				dataZoom: [{
					type: "inside",
				}, ],
				xAxis: {
					type: "category",
					axisTick: {
						alignWithLabel: true,
						color: "#094e8c",
					},
					axisLabel: {
						color: "#00aaff",
					},
					axisLine: {
						lineStyle: {
							color: "#094e8c",
						},
					},

					data: yData,
				},
				yAxis: {
					type: "value",
					minInterval: 1,
					axisTick: {
						alignWithLabel: true,
						color: "#094e8c",
					},
					max: parseInt(
						Math.max(...this.rightData.inspectorMap.map((item) => item.count)) *
						1.5
					),
					axisLabel: {
						color: "#00aaff",
					},
					axisLine: {
						lineStyle: {
							color: "#094e8c",
						},
					},
					splitLine: {
						lineStyle: {
							color: "rgba(3,27,78,0.1)",
						},
					},
				},
				animation: false,
				series: [{
					type: "line",
					stack: "总量",
					symbolSize: 6,
					lineStyle: {
						color: "#00a0fc",
						width: 1,
					},
					itemStyle: {
						color: "#00a0fc",

						borderWidth: 0,
					},
					label: {
						show: true,
						formatter: function(e) {
							return e.value;
						},
					},
					areaStyle: {
						/*  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						  { offset: 0, color: "rgba(2,53,150,0.5)" },
						  { offset: 1, color: "rgba(4,13,65,0.9" }
						]) */
						color: "rgba(2,53,150,0.5)",
					},
					data: this.rightData.inspectorMap.map((item) => item.count),
				}, ],
			};


			that.echartsList.echarts3.on("click", function(e) {
				console.log(e)
				that.mapShowType = "china";
				that.chinaData = that.rightData.inspectorMap.map((item) => {
					return {
						name: item.province,
						value: item.count,
					};
				});
				that.current_date = that.zhoren=='zh'?'验货员地域分布':'Sum Of Inspectors' ;
				that.select_value = ''
				that.$nextTick(function() {
					setTimeout(function() {
						that.createChinaMap(); //中国地图
					}, 500);
				});
			});
			window.addEventListener("resize", function() {
				setTimeout(function() {
					that.echartsList.echarts3.resize();
				}, 500)

			});
			if (option && typeof option === "object") {
				that.echartsList.echarts3.setOption(option, true);
			}
		},


		// 验货类型
		set_yhlx_data:function() {
			var that = this
			try {
				that.echartsList.echarts1.dispose();
			} catch (e) {}
			// var myChart = echarts.init(document.getElementById("yhlx"));
			that.echartsList.echarts1 = echarts.init(this.$refs.yhlxzb);
			var app = {};
			var option = null;
			option = {
				color: [
					"#fdd100",
					"#3fecff",
					"#ed5400",
					"#7351e3",
					"#ff4873",
					"#1fb5a5",
				],
				series: [{
					name: "面积模式",
					type: "pie",
					radius: [5, "90%"],
					center: ["50%", "50%"],
					roseType: "area",
					labelLine: {
						lineStyle: {
							color: "#28b1c7",
						},
						length: 2,
					},
					label: {
						show: true,
						formatter: function(e) {
							var label = "";
							switch (e.data.name) {
								case "抽检":
									label = that.zhoren === "zh" ? "抽检" : "FRI";
									break;
								case "全检":
									label = that.zhoren === "zh" ? "全检" : "FUI";
									break;
								case "在线检验":
									label = that.zhoren === "zh" ? "在线检验" : "OLI";
									break;
								case "验厂":
									label = that.zhoren === "zh" ? "验厂" : "FAT";
									break;
								case "监柜":
									label = that.zhoren === "zh" ? "监柜" : "CLS";
									break;
								default:
									label = that.zhoren === "zh" ? "验货+监柜" : "FRI+CLS";
							}
							return label + " " + parseInt(e.data.rate) + "%";
						},
						color: "#00aaff",
					},
					data: this.rightData.orderType.map((item) => {
						return {
							value: item.count,
							name: item.type,
							rate: item.rate,
						};
					}),
				}, ],
			};
			window.addEventListener("resize", function() {
				setTimeout(function() {
					that.echartsList.echarts1.resize();
				}, 500);
				/*   that.echartsList.echarts1.resize();  */
			});
			// that.echartsList.echarts1.on("click", function(e) {
			// 	var {
			// 		name
			// 	} = e;
			// 	var url = "";
			// 	switch (name) {
			// 		case "抽检":
			// 			that.$router.push("/index/ourServer?index=0");
			// 			break;
			// 		case "全检":
			// 			that.$router.push("/index/ourServer?index=1");
			// 			break;
			// 		case "在线检验":
			// 			that.$router.push("/index/ourServer?index=2");
			// 			break;
			// 		case "验厂":
			// 			that.$router.push("/index/ourServer?index=3");
			// 			break;
			// 		case "监柜":
			// 			that.$router.push("/index/ourServer?index=4");
			// 			break;
			// 		default:
			// 			that.$router.push("/index/ourServer?index=5");
			// 	}
			// });
			if (option && typeof option === "object") {
				that.echartsList.echarts1.setOption(option, true);
			}
			// myChart.setOption(option, true);
		},

		// 订单覆盖区域
		set_ddfgqy_data:function() {
			var that = this
			try {
				that.echartsList.echarts2.dispose();
			} catch (e) {}
			that.echartsList.echarts2 = echarts.init(this.$refs.ddfgqx);
			// var myChart = echarts.init(document.getElementById("ddfgqy"));
			var xTitle = [];
			if (this.zhoren === "zh") {
				xTitle = this.rightData.orderMap.map((item) => item.province);
			} else {
				xTitle = this.rightData.orderMap.map((item) => item.province_en);
			}
			var yValue = this.rightData.orderMap.map((item) => item.count);
			if (xTitle.length === 0) {
				if (this.zhoren === "zh") {
					xTitle = ["无"];
				} else {
					xTitle = ["empty"];
				}
			}
			if (yValue.length === 0) {
				yValue = [0];
			}
			var app = {};
			var option = null;
			option = {
				color: ['#3398DB'],
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					},
					formatter: function(e) {
						return e[0].name + ":" + e[0].value;
					},
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: 0,
					top: 20,
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					data: xTitle,
					axisTick: {
						alignWithLabel: true,
						color: "#094e8c",
					},
					axisLabel: {
						color: "#00aaff",
					},
					axisLine: {
						lineStyle: {
							color: "#094e8c",
						},
					},
				}],
				dataZoom: [{
					type: "inside",
				}, ],
				animation: false,
				yAxis: [{
					type: "value",
					axisLabel: {
						color: "#00aaff",
					},
					axisTick: {
						alignWithLabel: true,
						color: "#094e8c",
					},
					axisLine: {
						lineStyle: {
							color: "#094e8c",
						},
					},

					splitLine: {
						show: false,
					},
				}],
				series: [{
					name: "订单数量",
					type: "bar",
					barWidth: 20,
					label: {
						show: true,
						position: "top",
						color: "#00aaff",
						formatter: "{c}",
					},
					data: yValue,
					itemStyle: {
						normal: {
							label: {
								show: false,
							},
							color: function(params) {
								if (params.dataIndex === that.ddfgqxIndex) {
									return "#ED5400";
								} else {
									return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: "#21a3ff"
										},
										{
											offset: 1,
											color: "#016eff"
										},
									]);
								}
							},
						},
					},
				}]
			};

			that.echartsList.echarts2.on("click", function(e) {
				if (
					that.filter.country === "中国" ||
					that.filter.country === "china" ||
					that.filter.country === ""
				) {
					that.mapShowType = "china";

					that.chinaData = that.rightData.orderMap.map((item) => {
						return {
							name: item.province,
							value: item.count,
						};
					});
					that.current_date = that.zhoren=='zh'?'订单覆盖区域':'Coverd Cities'
					that.select_value = ''
					if (that.ddfgqxIndex === e.dataIndex) {
						that.ddfgqxIndex = -1;
					} else {
						that.ddfgqxIndex = e.dataIndex;
					}
				}

				that.filter.province = e.name;

				that.$nextTick(function() {
					setTimeout(function() {
						if (
							that.filter.country === "中国" ||
							that.filter.country === "china" ||
							that.filter.country === ""
						) {
							that.createChinaMap(); //中国地图
						}
						that.set_ddfgqy_data();
						that.get_bigData();
					}, 500);
				});
			});
			window.addEventListener("resize", function() {
				setTimeout(function() {
					that.echartsList.echarts2.resize();
				}, 500);
				/*        that.echartsList.echarts2.resize(); */
			});
			if (option && typeof option === "object") {
				that.echartsList.echarts2.setOption(option, true);
			}

		},

		// 客户地域分布
		set_khdyfbzb_data:function() {
			var aColor = [
				"#9F64FE",
				"#79E30F",
				"#88C4CF",
				"#976EF0",
				"#D194F1",
				"#659DAE",
				"#9F64FE",
				"#79E30F",
				"#88C4CF",
				"#976EF0",
				"#D194F1",
				"#659DAE",
			];
			var that = this
			var xData = [];
			var listArr = this.leftData.userMap.list.slice(0, 10);
			var echartsList = listArr.sort(this.reviseArr("count"));
			if (this.zhoren === "zh") {
				xData = echartsList.map((item) => item.country);
			} else {
				xData = echartsList.map((item) => item.country_en);
			}
			// var myChart = echarts.init(document.getElementById("khdyfbzb"));
			that.echartsList.echarts4 = echarts.init(this.$refs.khdyfbzb);
			var app = {};
			var option = null;
			option = {
				grid: {
					left: "3%",
					right: "20",
					bottom: "3%",
					top: 20,
					containLabel: true,
				},
				xAxis: {
					type: "value",
					boundaryGap: [0, 0.01],
					axisLine: {
						show: false,
					},
					axisLabel: {
						show: false,
					},
					max: Math.max(...Array.from(echartsList, (item) => item.count)) * 1.3,
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
					},
				},
				yAxis: {
					type: "category",
					data: xData,
					axisLine: {
						show: false,
					},

					axisTick: {
						show: false,
					},
					axisLabel: {
						color: "#03a6fe",
					},
				},
				animation: false,
				/*  dataZoom: [
				  {
				    type: "inside",
				  },
				], */
				series: [{
					name: "",
					type: "bar",
					barMaxWidth: 30,
					label: {
						show: true,
						position: "right",
						color: "#fff",
						formatter: function(e) {
							return e.data.value + "  " + parseInt(e.data.rate) + "%"; //标签部份
						},
					},
					data: echartsList.map((item) => {
						return {
							value: item.count,
							rate: item.rate,
						};
					}),
					itemStyle: {
						normal: {
							color: function(params) {
								if (params.dataIndex === that.khdyfbIndex) {
									return "#ED5400";
								} else {
									return (
										aColor[params.dataIndex] ||
										aColor[parseInt(Math.random() * 10)]
									);
								}
							},
						},
					},
					emphasis: {
						/*  itemStyle: {
						  color: "#03a6fe"
						} */
					},
				}, ],
			};
			that.echartsList.echarts4.on("click", function(e) {
				console.log(e)
				that.filter.country = e.name;
				that.filter.province = "";
				that.mapShowType = "world";
				that.filter.select_value = "";
				that.ddfgqxIndex = -1;
				if (that.ddfgqxIndex === e.dataIndex) {
					that.khdyfbIndex = -1;
				} else {
					that.khdyfbIndex = e.dataIndex;
				}
				that.get_bigData();
				that.get_right_data();
			});
			window.addEventListener("resize", function() {
				setTimeout(function() {
					that.echartsList.echarts4.resize();
				}, 500);
				/*   that.echartsList.echarts4.resize(); */
			});
			if (option && typeof option === "object") {
				that.echartsList.echarts4.setOption(option, true);
			}
			// myChart.setOption(option, true);
		}

	},
	mounted:function() {
		var that = this
		that.current_date = that.zhoren=='zh'?'按日期查看':'Please enter date' ;
		this.get_bigData()
		this.get_right_data()
	},
	destroyed:function() {
		try {
			this.worldMap1.dispose();
		} catch (e) {}
	},
})
