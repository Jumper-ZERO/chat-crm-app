import ChatList from "@/components/chat-list"
import SearchForm from "@/components/search-form"
import ChatBox from "@/components/chat-box"

export default function Home() {
  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-1 auto-rows-min gap-4 px-5">
      <SearchForm />
      <div className="col-start-1 row-start-2 rounded-xl bg-muted/50">
        <ChatList />
      </div>
      <div className="sm:col-start-2 sm:col-span-2 sm:row-span-2 rounded-xl bg-muted/50 p-4 flex items-end">
        <ChatBox />
      </div>
    </div>
  )
}
