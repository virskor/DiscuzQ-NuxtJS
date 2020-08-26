<template>
	<div>
		<v-container fluid>
			<v-row align="center" justify="center">
				<v-col class="pt-0" cols="12" md="12">
					<v-card elevation="0" tile class="mx-auto">
						<v-carousel
							:continuous="false"
							cycle
							:show-arrows="true"
							hide-delimiter-background
							delimiter-icon="mdi-minus"
							height="500"
						>
							<v-carousel-item v-for="(slide, i) in slides" :key="i">
								<template>
									<v-sheet tile>
										<v-parallax width="100%" height="500" :src="slide.src" :lazy-src="slide.src">
											<v-row class="fill-height" align="end" justify="start">
												<v-col cols="12" md="12">
													<div class="text-h1 font-weight-black pl-3 text-shadow">{{ slide.caption }}</div>
													<div class="display-1 pl-3 text-shadow">{{ slide.subtitle }}</div>
												</v-col>
											</v-row>
										</v-parallax>
									</v-sheet>
								</template>
							</v-carousel-item>
						</v-carousel>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
		<v-container>
			<v-row align="center" justify="center">
				<v-col cols="12" md="12">
					<v-alert dark dismissible color="primary">
						我们的APP还在开发中，在近期测试完成后将提供公众试用。
						<nuxt-link to="/users/login">
							<strong class="white--text">点击注册登录</strong>
						</nuxt-link>后，我们将第一时间邀请您
					</v-alert>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12" md="8">
					<v-card outlined>
						<v-list-item three-line>
							<v-list-item-content>
								<div class="display-1 font-weight-black mb-4">我们将在近期开放</div>
								<div class="text-h1 font-weight-black mb-4">连接5座城</div>
								<v-list-item-title class="headline mb-1">下载APP，畅享云上德宏本土私域APP！</v-list-item-title>
								<v-list-item-subtitle>我们现在还没有开放下载，开放后点击下方链接即可下载</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-list-item three-line>
							<v-list-item-content>
								<v-list-item-subtitle>
									<v-btn @click="download" class="pa-0" large text>
										<v-img width="140" src="/app_store.svg"></v-img>
									</v-btn>
									<v-btn @click="download" class="pa-0" large text>
										<v-img width="140" src="/google_play.svg"></v-img>
									</v-btn>
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-card>
				</v-col>
				<v-col cols="12" md="4">
					<v-card tile class="pb-0" outlined>
						<v-list-item three-line>
							<v-list-item-content>
								<div class="display-1 font-weight-black mb-4">微信公众号</div>
								<v-list-item-title class="headline mb-1">扫描来关注</v-list-item-title>
								<v-list-item-subtitle>
									添加开发者微信：
									<v-btn text>gentlevirs</v-btn>
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-img size="100" lazy-src="/scan.png" src="/scan.png" />
					</v-card>
				</v-col>
			</v-row>

			<v-row align="center" justify="center">
				<v-col align="center" cols="12" md="12">
					<p class="text-h3 font-weight-black">供求德宏，先知德宏生活</p>
					<p class>供求德宏是一款本土化的APP，为德宏本地用户提供优质的供求信息发布能力。打造德宏同城私域流量圈，创云上德宏！</p>
				</v-col>
				<v-row align="center" justify="center">
					<v-col cols="12" md="4">
						<v-card outlined class="pa-5 ma-2">
							<v-list-item three-line>
								<v-list-item-avatar tile>
									<v-img src="/icons/city.svg" />
								</v-list-item-avatar>
								<v-list-item-content>
									<div class="display-1 font-weight-black mb-4">社交</div>
									<v-list-item-title class="headline mb-1">让同城圈子更紧密。</v-list-item-title>
									<v-list-item-subtitle>同城交友</v-list-item-subtitle>
									<v-list-item-subtitle>本地化短视频</v-list-item-subtitle>
									<v-list-item-subtitle>话题等丰富的社交功能</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-card>
					</v-col>
					<v-col cols="12" md="4">
						<v-card outlined class="pa-5 ma-2">
							<v-list-item three-line>
								<v-list-item-avatar tile>
									<v-img src="/icons/info.svg" />
								</v-list-item-avatar>
								<v-list-item-content>
									<div class="display-1 font-weight-black mb-4">供求</div>
									<v-list-item-title class="headline mb-1">供求信息发布。</v-list-item-title>
									<v-list-item-subtitle>同城招聘更加便捷</v-list-item-subtitle>
									<v-list-item-subtitle>销售，求货更灵活</v-list-item-subtitle>
									<v-list-item-subtitle>认证信息更可靠</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-card>
					</v-col>
					<v-col cols="12" md="4">
						<v-card outlined class="pa-5 ma-2">
							<v-list-item three-line>
								<v-list-item-avatar tile>
									<v-img src="/icons/shop.svg" />
								</v-list-item-avatar>
								<v-list-item-content>
									<div class="display-1 font-weight-black mb-4">商圈</div>
									<v-list-item-title class="headline mb-1">了解你的周边。</v-list-item-title>
									<v-list-item-subtitle>知道最近商家活动</v-list-item-subtitle>
									<v-list-item-subtitle>同城跑腿</v-list-item-subtitle>
									<v-list-item-subtitle>翡翠频道</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-card>
					</v-col>
				</v-row>
			</v-row>
		</v-container>
	</div>
</template>

<script>
export default {
	name: "AppLanding",
	data() {
		return {
			slides: [
				{
					caption: "让德宏更同城",
					subtitle: "丰富的社交功能，打造有价值的同城私域流量",
					src: "/hero-back.jpg",
				},
				{
					caption: "让供求更及时",
					subtitle:
						"为用户提供更有价值和具有实效性的供求信息发布版面",
					src: "/pexels-photo-95425.jpeg",
				},
			],
		};
	},
	methods: {
		download() {
			alert("暂不开放，您可以先注册。开放后我们将第一时间通知您");
		},
	},
};
</script>

<style>
</style>