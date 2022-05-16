import bugUrl from "../../assets/bug.svg";
import ideagUrl from "../../assets/idea.svg";
import otherUrl from "../../assets/other.svg";

import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedBackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedBackContentStep";
import { FeedBackSuccessStep } from "./Steps/FeedBackSuccessStep";


export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image:{
            source: bugUrl,
            alt: "Imagem de um inseto",
        }
     
    },
    IDEA: {
        title: "Ideia",
        image:{
            source: ideagUrl,
            alt: "Imagem de uma lâmpada",
        }
   
    },
    OTHER:{
        title: "Outros",
        image:{
            source: otherUrl,
            alt: "Imagem de um balão de pensamento",
        }
    }
}

export type feedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
    const [feedbackType, setFeedbackType] = useState<feedbackType | null>(null)
    const [feebackSent, setFeedbackTypeSent] = useState(false)

    function handleRestartFeedback(){
        setFeedbackTypeSent(false);
        setFeedbackType(null);
    }

    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
          { feebackSent ? (
              <FeedBackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
          ) : (
            <>
              {!feedbackType ?(
               <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
              ) : (
               <FeedbackContentStep feedbackType={feedbackType} 
                onFeedbackRestartRequested={handleRestartFeedback}
                onFeedbackSent={() => setFeedbackTypeSent(true)}
               />
             )}
            </>
          )}  
          

            <footer className="text-xs text-neutral-400">
                Feito com amor pela <a className="underline underline-offset-1" href="http://https://Rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    )
}