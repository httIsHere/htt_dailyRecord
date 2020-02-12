const cloud = require('wx-server-sdk')
const md5 = require('js-md5')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const userCollection = db.collection('user')

exports.main = async event => {
  const wxContext = cloud.getWXContext()
  let { user_info } = event
  try {
    const allUser = (await userCollection.get()).data
    const [userInfo] = allUser.filter(d => d.openId === wxContext.OPENID)
    let nickName, avatarUrl, gender, token, _time = db.serverDate()
    if(!userInfo) {
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
    return {
      nickName: nickName || user_info.nickName,
      gender: gender || user_info.gender,
      avatarUrl: avatarUrl || user_info.avatarUrl,
      openId: wxContext.OPENID,
      token
    }
  } catch(e) {
    console.error(e)
    return {
      statusCode: 500,
      errorMsg: '服务器错误'
    }
  }
}