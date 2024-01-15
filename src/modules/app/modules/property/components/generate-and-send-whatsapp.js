import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function generatePDF() {
  const element = document.getElementById('pdfContent');

  html2canvas(element).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    const pdfDataUri = pdf.output('dataurlstring');
    sendPDFToWhatsApp(pdfDataUri);
  });
}
function sendPDFToWhatsApp(pdfDataUri) {
  const phoneNumber = 'RECIPIENT_PHONE_NUMBER';
  const encodedUri = encodeURIComponent(pdfDataUri);
  const whatsappUrl = `https://api.whatsapp.com/send?text=Check out this PDF: ${encodedUri}`;

  window.open(whatsappUrl);
}
