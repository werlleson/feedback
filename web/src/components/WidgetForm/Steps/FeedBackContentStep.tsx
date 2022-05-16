import { ArrowLeft } from "phosphor-react";
import { ScreenshotButton } from "../ScreeshortButton";
import { FormEvent, useState } from "react";
import { feedbackType, feedbackTypes } from ".."
import { api } from "../../../lib/api";
import { Loading } from "../../Loading";




interface FeedBackContentStepProps {
  feedbackType: feedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent:() => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedBackContentStepProps) {

  const [screenshot, setScreenshot] = useState<string | null>('')
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  
  const feedbackTypeInfo = feedbackTypes[feedbackType]

  async function handleSubmitFeedback(event: FormEvent){
    event.preventDefault();


    setIsSendingFeedback(true)

    // console.log({
    //   screenshot,
    //   comment,
    // })

   await api.post('/feedbacks',{
     type: feedbackType,
     comment,
     screenshot,
   })

   setIsSendingFeedback(false)

    onFeedbackSent()
  
  }
  return (
    <>
                    {/* parte de cima do feedback */}
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
          
        <span 
          className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        
      </header>
        <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
          <textarea
            className="min-w-[304px] w-full min-h[112px] text-sm placeholder-zinc-400  text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:right-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
            placeholder="Conte com detalhes o que está acontecendo..."
            onChange={event => setComment(event.target.value)}
          />

          <footer className="flex gap-2 mt-2">
            <ScreenshotButton
             screenshot={screenshot}
             onScreenshotTook={setScreenshot}
            />

            <button
              type="submit"
              disabled = {comment.length === 0 || isSendingFeedback}
              className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
             >
              {isSendingFeedback ? <Loading/> :' Enviar feedback'}
           </button>
          </footer>
      </form>
    </>
  );
}