export default [{
    name: 'verify',
    method: 'GET',
    desc: '邀请码校验',
    localPath: '/mock/code.json',
    path: '',
    params: {
        code: '',
        name: '',
        phone: '',
        store: '',
        pmodel: ''
    }
},{
    name: 'check',
    method: 'GET',
    desc: '邀请码检查',
    localPath: '/mock/code.json',
    path: '',
    params: {
        code: ''
    }
},{
    name: 'prize',
    method: 'GET',
    desc: '抽奖',
    localPath: '/mock/code.json',
    path: '',
    params: {
        code: ''
    }
},{
    name: 'list',
    method: 'GET',
    desc: '抽奖',
    localPath: '/mock/code.json',
    path: '',
    params: {
        count: 50
    }
}]
