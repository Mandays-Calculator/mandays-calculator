import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type CompilePDFParam = {
  callback1: (value: boolean) => void;
  switchTabCallback: (value: number) => void;
  sprintName: string;
};

export const captureTabContent = async (
  tabId: number,
  switchTabCallback: (value: number) => void
) => {
  switchTabCallback(tabId);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const content = document.getElementById("divToPrint");
  if (content) {
    return html2canvas(content, {
      scrollY: -window.scrollY,
      useCORS: true,
      scale: 2,
    }).then((canvas) => {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "letter",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const padding = 20;
      const adjPdfWidth = pdfWidth - padding * 2;
      const adjPdfHeight = pdfHeight - padding * 2;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const canvasRatio = canvasWidth / canvasHeight;
      const pdfRatio = adjPdfWidth / adjPdfHeight;

      let finalWidth, finalHeight;
      if (canvasRatio > pdfRatio) {
        finalWidth = adjPdfWidth;
        finalHeight = adjPdfWidth / canvasRatio;
      } else {
        finalHeight = adjPdfHeight;
        finalWidth = adjPdfHeight * canvasRatio;
      }

      const imgData = canvas.toDataURL("image/png");
      return { imgData, finalWidth, finalHeight, padding };
    });
  }
};

export const compilePDF = async ({
  callback1,
  switchTabCallback,
  sprintName,
}: CompilePDFParam) => {
  callback1(true);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: "letter",
  });
  const tabIds = [0, 1, 2, 3];

  for (let i = 0; i < tabIds.length; i++) {
    const { imgData, finalWidth, finalHeight, padding }: any =
      await captureTabContent(tabIds[i], switchTabCallback);
    pdf.addImage(imgData, "PNG", padding, padding, finalWidth, finalHeight);

    if (i < tabIds.length - 1) {
      pdf.addPage();
    }
  }
  const now = new Date();
  const date = (now.toLocaleDateString("en-CA") as any).replaceAll("/", "-");
  const time = (now.toLocaleTimeString("en-GB") as any).replaceAll(":", "-");
  const filename = `sprint_${sprintName}_details_${date}_${time}.pdf`;
  pdf.save(filename);
  callback1(false);
};
