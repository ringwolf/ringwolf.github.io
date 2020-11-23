new Vue({
		el: '#page1',
		data: {
			lastSum: 0,
			Count: "000000",
			zhoren:localStorage.getItem("locale") || "zh"
		},
		methods: {
			getorderCount:function() {
				var that = this
				$.ajax({
					url: 'http://api.globalinsp.com/api/u_is/orderCount',
					data: '',
					type: "POST",
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					success: function(data) {
						if (data.data.count > that.lastSum) {
							that.lastSum = data.data.count;
							setTimeout(function() {
								that.numberAni(data.data.count);
							}, 1000);
						}

					},
				})
			},

			//数字切换动画
			numberAni:function(value) {
				var that = this;
				clearInterval(this.timer3);
				console.log(value)
				var sum = Number(that.Count) || 0;
				this.timer3 = setInterval(function() {
					var speed = (value - sum) / 2;
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					sum += speed;
					/*     if (sum.toString().length < 7) {
					  sum = (sum + 10000000).toString().substring(1);
					} else {
					  sum = sum.toString();
					}; */
					if (Number(sum) >= Number(value)) {
						clearInterval(that.timer3);
						if (sum.toString().length < 6) {
							that.Count = (sum + 1000000).toString().substring(1);
						} else {
							that.Count = sum.toString();
						}
						return;
					}

					if (sum.toString().length < 6) {
						that.Count = (sum + 1000000).toString().substring(1);
					} else {
						that.Count = sum.toString();
					}
				}, 30);
			},

		},
		mounted:function() {
			this.getorderCount()
		}
	})
