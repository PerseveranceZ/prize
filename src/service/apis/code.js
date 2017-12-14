export default [{
    name: 'verify',
    method: 'GET',
    desc: '邀请码校验',
    localPath: '/mock/code.json',
    path: '/api/prize/verify',
    params: {
        code: '',
        user_name: '',
        user_phone: '',
        shop_name: '',
        model_type: ''
    }
},{
    name: 'check',
    method: 'GET',
    desc: '邀请码检查',
    localPath: '/mock/code.json',
    path: '/api/prize/getdata',
    params: {
        code: ''
    }
},{
    name: 'prize',
    method: 'GET',
    desc: '抽奖',
    localPath: '/mock/code.json',
    path: '/api/prize/setstatus',
    params: {
        code: ''
    }
},{
    name: 'list',
    method: 'GET',
    desc: '抽奖列表',
    localPath: '/mock/code.json',
    path: '/api/prize/getlist',
    params: {
        page: 1,
        size: 50
    }
}]
