<template>
	<div>
		<AppTitle title="更新日志"></AppTitle>
		<v-container class="scaffold">
			<v-card tile flat>
				<v-card-title>最新上传的代码</v-card-title>
				<v-card-subtitle
					>我们为您列出最近上传的代码中包含的更新。仅为您提供参考，这是第三方的PC
					DESKTOP版本（将先作为Lite版本发布），暂时无法用于生产。您可以再Github上关注，以便第一时间知道是否可用于生产
					{{
						githubUrl
					}}。我们所有的功能，将在9月15日前完成。部分需求计划但并不会再9月15日前完全完成（Lite
					RC），而是将剩余需求每周迭代。因为这部分需求并不影响使用。</v-card-subtitle
				>
			</v-card>
			<v-card tile flat class="pl-4">
				<p>剩余未完成或计划近期完成的：私信</p>
				<p>剩余未完成或计划近期完成的：冻结明细，提现，流水等</p>
				<p>剩余未完成或计划近期完成的：新增 编辑帖子或评论</p>
				<p>
					剩余未完成或计划近期完成的：使用零钱包，及支付密码输入组件
				</p>
				<p>剩余未完成或计划近期完成的：新增视频上传</p>
				<p>剩余未完成或计划近期完成的：腾讯LBS支持</p>
				<p>剩余未完成或计划近期完成的：站点付费模式</p>
			</v-card>
			<v-list>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-11-03</p>
						<p>忘记密码时支持修改密码</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-11-02</p>
						<p>支持腾讯云serverless部署</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-11-01</p>
						<p>支持SSR</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-10-30</p>
						<p>新增隐私政策，注册条款显示</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-09-28</p>
						<p>代码高亮</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-09-24</p>
						<p>新增拉黑屏蔽用户</p>
						<p>新增我的屏蔽列表</p>
						<p>实名认证</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-09-23</p>
						<p>优化举报表单</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-09-21</p>
						<p>PC端筛选器优化</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-09-20</p>
						<p>编辑器新增部分属性，隐藏部分选项</p>
						<p>新增举报帖子，用户，评论</p>
						<p>新增非图片的附件渲染和下载支持</p>
						<p>附件上传时，根据后端设置限制上传文件大小</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-09-19</p>
						<p>编辑器黑暗模式兼容</p>
						<p>新增附件上传</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-09-16</p>
						<p>修改视频播放器</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-09-15</p>
						<p>话题列表修改</p>
						<p>UI一些布局优化</p>
						<p>编辑器状态化</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-09-14</p>
						<p>新增修改个性签名</p>
						<p>新增修改用户名</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-09-11</p>
						<p>新增图片上传</p>
						<p>收起顶置的帖子</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-09-06</p>
						<p>补全refresh-token请求</p>
						<p>补全未读消息提醒</p>
						<p>用户推荐新增换一换</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-09-04</p>
						<p>手机浏览时，增加底部导航条</p>
						<p>头像上传组件</p>
						<p>文件上传类</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-09-03</p>
						<p>新增发评论，支持发布评论，增加楼层评论按钮</p>
						<p>无法查看消息关联的评论的BUG</p>
						<p>新增发帖支持</p>
						<p>补全评论附件显示</p>
						<p>新增删除评论</p>
						<p>修复发帖分类选择权限问题</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-09-01</p>
						<p>表情组件修复</p>
						<p>编辑器转化为markdown</p>
						<p>优化ThreadCard传参，解决顶置帖子标题未显示的BUG</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-08-31</p>
						<p>新增表情选择组件</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-08-30</p>
						<p>扫码看帖(在手机中查看引流)</p>
						<p>补全评论的'回复 @用户' 信息</p>
						<p>新增偏好设置 ‘不看付费的帖子’</p>
						<p>新增编辑器（拓展QuillJS）</p>
						<p>登录页面相关提示</p>
						<p>支持购买付费贴</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-08-29</p>
						<p>[帖子编辑]支持删除自己发布的帖子</p>
						<p>支持继续在订单明细中支付订单</p>
						<p>新增评论排序筛选</p>
						<p>消息提醒显示未读数量</p>
						<p>
							修复用户刷新页面时，异步请求导致的登录状态同步紊乱
						</p>
						<p>主题标签布局更新，新增主题详情内关注发布人</p>
						<p>新增查看评论(点击评论来查看回复)</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-08-27</p>
						<p>新增消息列表</p>
						<p>新增微信扫码支付(在打赏中进行体验)</p>
						<p>新增订单查询筛选组件</p>
						<p>新增订单明细</p>
						<p>新增可拓展的导航菜单</p>
						<p v-if="false">支持删除自己发布的帖子</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-08-26</p>
						<p>新增话题详情</p>
						<p>增加用户的关注，粉丝列表</p>
						<p>增加我的收藏主题列表</p>
						<p>增加用户点赞的帖子展示</p>
						<p>新增打赏用户显示组件</p>
						<p>新增打赏询问组件</p>
						<p>新增支付询问组件</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-08-25</p>
						<p>用户关注按钮组件</p>
						<p>加载更多评论</p>
						<p>搜索帖子</p>
						<p>增加搜索用户</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-08-24</p>
						<p>点赞帖子</p>
						<p>用户主页的部分功能</p>
						<p>腾讯云CDN快速刷新命令</p>
					</v-card>
				</v-list-item>
			</v-list>
		</v-container>
	</div>
</template>

<script>
export default {
	head: {
		title: "更新日志",
	},
	data() {
		return {
			githubUrl: "https://github.com/virskor/DiscuzQ-NuxtJS",
		};
	},
	methods: {},
};
</script>
