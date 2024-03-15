/**
 * 发布-订阅者模式在实践中一般存在以下三方
 * publisher 发布中心，关注消息发布
 * dispatcher 调度中心，在消息发布后负责通知订阅者
 * subscriber 订阅者，关注消息并做出响应
 */

class Dispatcher {
  constructor(publisher) {
    
  }

  subscribe(key) {

  }

  unsubscribe() {

  }
}

class Publisher {
  constructor(state) {
    this.state = state;
  }

  publish(newState){
    this.state = newState;
  }
}


