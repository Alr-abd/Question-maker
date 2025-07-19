import QRCode from "react-qr-code";

export default function Send() {
  return (
    <main className="bg-[#EEF0F5] h-[calc(100vh_-_96px)] flex items-center justify-center lg:h-[calc(100vh_-_48px)]">
      <div className="flex flex-col items-center gap-6 p-8 rounded bg-white sm:px-16">
        <div className="h-12 w-full text-sm font-medium flex items-center justify-center bg-[#EEF0F5] border border-dashed border-[#bbbcc0] rounded-lg cursor-pointer hover:bg-neutral-100">
          https://survey.porsline.ir/s/Ek27ElAg
        </div>
        <QRCode value="fvgbghn" />
      </div>
    </main>
  )
}
