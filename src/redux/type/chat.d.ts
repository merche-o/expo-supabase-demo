

interface IMessage{
    id?: string,
    event_id: string,
    user_id: string,
    timestamp?: Date,
    content:string

}

type MessageState ={ 
    messages: IEvent[]
}

type MessageAction = {
    id?: string,
    event_id:string,
    type:string,
    data? :IMessage
    history?: IMessage[]
}

type DispatchMessage = (args: MessageAction) => MessageAction
