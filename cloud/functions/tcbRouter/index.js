// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

const md5 = require('js-md5')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const userCollection = db.collection('user')

// 云函数入口函数
exports.main = async (event, context) => {
    console.log(event, context)
    const app = new TcbRouter({ event })

    // app.use 表示该中间件会适用于所有的路由
    app.use(async (ctx, next) => {
        console.log('---------->进入全局的中间件')
        ctx.data = event
        await next(); // 执行下一中间件
        console.log('---------->退出全局的中间件')
    });

    // 路由为字符串，该中间件只适用于 login 路由
    app.router('login', async (ctx, next) => {
        console.log('---------->进入登录路由中间件')
        const wxContext = cloud.getWXContext()
        let { user_info } = event
        try {
            const allUser = (await userCollection.get()).data
            const [userInfo] = allUser.filter(d => d.openId === wxContext.OPENID)
            let nickName, avatarUrl, gender, token, _time = db.serverDate()
            if (!userInfo) {
                nickName = user_info.nickName;
                gender = user_info.gender;
                avatarUrl = user_info.avatarUrl;
                await userCollection.add({
                    data: {
                        openId: wxContext.OPENID,
                        createdTime: _time,
                        nickName: user_info.nickName,
                        gender: user_info.gender,
                        avatarUrl: user_info.avatarUrl,
                        updated_time: _time
                    }
                })
            } else {
                nickName = userInfo.nickName
                avatarUrl = userInfo.avatarUrl
                gender = userInfo.gender
                await userCollection.doc(userInfo._id).update({
                    data: {
                        nickName: nickName || user_info.nickName,
                        gender: gender || user_info.gender,
                        avatarUrl: avatarUrl || user_info.avatarUrl,
                        updated_time: _time
                    }
                })
            }
            token = md5(wxContext.OPENID + _time)
            ctx.body = {
                nickName: nickName || user_info.nickName,
                gender: gender || user_info.gender,
                avatarUrl: avatarUrl || user_info.avatarUrl,
                openId: wxContext.OPENID,
                token
            }
        } catch (e) {
            ctx.body = {
                statusCode: 500,
                errorMsg: '服务器错误'
            }
        }
        await next();
        console.log('---------->退出登录路由中间件')
    });

    // srvTime
    app.router('srv-time', async (ctx, next) => {
        ctx.body = {
            srvTime: Date.now()
        }
    })
    return app.serve();
}