# dynamic-code-system

**基于 Egg.js 的 RESTful 风格动态代码下发系统**

**动态代码下发系统**赋予某个脚本动态的特性，开发人员/产品人员通过控制台界面操作可以对该脚本的内容进行更改，而从可以在不重新发版的情况下，直接更新线上代码

## 技术选型

- Node.js 10+
- Egg.js 2.x
- Mysql 5.8+
- Redis 5

## 使用方式

#### 区分

- server 目录为服务端目录
- client 目录为客户端目录

#### 测试环境服务启动

```bash
sudo yarn
sudo yarn dev
```

#### 生产环境服务启动/停止

> 生产环境请勿使用 `Ctrl + C` 终止服务

```bash
sudo yarn
sudo yarn start
sudo yarn stop
```

#### 浏览器端成品代码引入

> 此处 appid 即为配置应用的 appid

```html
<script src="http://***/api/v1/source/:appid"></script>
```

## API

API 设计遵循标准化 RESTful 风格，响应头 `application/json`，规则如下

- GET：读取（Read）
- POST：新建（Create）
- PUT：更新（Update）
- PATCH：更新（Update），通常是部分更新
- DELETE：删除（Delete）

### 配置相关

#### /api/v1/config

Desc: 查询所有可用的 app

Method: `GET`

Query:

```json
{
    "page": 1,
    "pageSize": 10
}
```

#### /api/v1/config

Desc: 创建新的 app 配置

Method: `POST`

Body:

```json
{
    "project": "Yours app name"
}
```

#### /api/v1/config/:appid

Desc: 获取已有 app 配置

Method: `GET`

#### /api/v1/config/:appid

Desc: 更新已有 app 配置

Method: `PUT/PATCH`

Body:

```json
{
    "project": "Yours app name",
    "schema": "app's schema"
}
```

```json
schema 必须为数组，其单项规则如下:
[
    {
        "type": "item type",
        "params": "item's options"
    }
]
```

#### /api/v1/config/:appid

Desc: 软删除已有 app 配置

Method: `DELETE`

### 资源相关

#### /api/v1/source/:appid

Desc: 获取已有 app 动态代码

Method: `GET`

## 构建模块扩展

自定义构建模块，需要在 `service/modules` 目录下新建构建模块目录（目录命名对应 `schema.type`），目录中模块应最终返回成品代码

然后在 `service/modules/index.js` 中 require 该模块，在 `module.export` 的 `Map` 中建立 type 与模块函数的映射关系，映射关系中值的 options 参数即为 `schema.arguments`，至此即完成了模块扩展引入

> 具体可参考用作测试的 test 模块的引入方式

## 稳定性方案

为了不让服务直面客户端，可以在服务前面设立一道防线，常见的做法有：

- API 接入 Gateway
- 静态资源 CDN 化

系统目前实现了脚本的 API 化，但是其本质还是服务器返回脚本，访问是不需要登录或者权限的，所以采取 CDN 更加适合生产模式

由此带来的好处：

- 根据缓存和回源特性，拦截了大部分流量，缓解了源站的压力
- CDN 服务在全国各地都有节点，可以有效解决跨地域访问问题，降低访问延时
- 利用 CDN 强大的计算能力，可以拦截恶意攻击、降低“广播风暴”的影响

#### 建议

由于客户端访问的脚本地址仍然是一个不变地址，所以返回脚本不能是永久缓存，需要设置一个较短的时间

> 目前，从结果来看，5 分钟是一个可接受的实践值

## 授权协议

MIT
