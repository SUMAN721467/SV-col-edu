import React from 'react';

interface DocModalProps {
  isOpen: boolean;
  type: string;
  onClose: () => void;
}

export const DocModal: React.FC<DocModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen) return null;

  let title = "Official Statutory Order";
  let gazetteNotif = "Gazette Notification";
  let orderNo = "";
  let orderDate = "";
  let intake = "50 Seats";
  let pdfUrl = "assets/pdf/NCTE ORDER COPY  D.EL.ED.pdf";
  let clauses: string[] = [];

  if (type === 'deled-ncte') {
    title = "NCTE Recognition Order - D.El.Ed Course (ERCAPP77)";
    gazetteNotif = "Gazette of India, Extraordinary • ERC NCTE Order";
    orderNo = "ERC/7-162.6.8/NCTE/D.El.Ed./2013/21191";
    orderDate = "15/10/2013";
    pdfUrl = "assets/pdf/NCTE ORDER COPY  D.EL.ED.pdf";
    clauses = [
      "Grant of Recognition under Section 14(3)(a) of the NCTE Act 1993 for conducting 2-Year D.El.Ed program.",
      "Strict compliance with minimum academic eligibility standards prescribed by NCTE & WBBPE.",
      "Mandatory maintenance of faculty-student ratio of 1:15 and bio-metric attendance protocols.",
      "Statutory maintenance of reserve fund & endowment fund accounts in joint name with Regional Director, ERC NCTE."
    ];
  } else if (type === 'bed-ncte') {
    title = "NCTE Recognition Order - B.Ed Course (ERCAPP3967)";
    gazetteNotif = "NCTE Regional Committee Order • Part-2 APP3967";
    orderNo = "F. No. 234.2.1(Part-2)/APP3967/B.Ed./2016/52099";
    orderDate = "04/04/2017";
    pdfUrl = "assets/pdf/B.ED . RECOGNISED COPY.pdf";
    clauses = [
      "Grant of permission under Section 15(3)(a) of the NCTE Act 1993 for conducting 2-Year B.Ed program with 50 intake.",
      "Adherence to Clause 7(16) of NCTE Regulations 2014 & curriculum prescribed by Baba Saheb Ambedkar Education University.",
      "Mandatory institutional biometric faculty logs, library automation, and certified laboratories.",
      "Submission of Annual Performance Appraisal Reports (PAR) and certified audited financial statements."
    ];
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-primary-gradient text-white p-6 flex justify-between items-center relative border-b-2 border-gold">
          <div>
            <span className="text-xs font-bold text-gold-light uppercase tracking-wider block mb-1">
              Official Statutory Disclosure
            </span>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <i className="fa-solid fa-xmark text-lg w-5 text-center"></i>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          <div className="border-b border-slate-200 pb-4">
            <p className="text-xs font-bold text-slate-500 uppercase">{gazetteNotif}</p>
            <h4 className="text-navy font-bold text-base mt-1">Order No: {orderNo}</h4>
            <p className="text-gold text-sm font-semibold mt-0.5">Date of Notification: {orderDate}</p>
          </div>

          <div className="bg-surface-main p-4 rounded-xl space-y-1.5 text-xs sm:text-sm text-slate-700">
            <p><strong>Institution:</strong> Swami Vibekananda College of Education</p>
            <p><strong>Managing Trust:</strong> Sahid Khudiram Memorial Trust</p>
            <p><strong>Approved Intake:</strong> {intake}</p>
          </div>

          <div>
            <h5 className="font-bold text-navy text-sm mb-2">Key Regulatory Provisions:</h5>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {clauses.map((clause, i) => (
                <li key={i}>{clause}</li>
              ))}
            </ul>
          </div>

          {/* Action Download Buttons */}
          <div className="flex items-center gap-3 pt-3 flex-wrap border-t border-slate-100">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-gold text-xs"
            >
              <i className="fa-solid fa-file-pdf"></i> View Signed Original PDF
            </a>
            <a
              href={pdfUrl}
              download
              className="btn-secondary-custom text-xs"
            >
              <i className="fa-solid fa-download"></i> Download PDF
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
