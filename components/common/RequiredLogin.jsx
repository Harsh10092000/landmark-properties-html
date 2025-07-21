import Link from "next/link";

export default function RequiredLogin() {
    return (
        <>
            <div className="modal-backdrop">
                <div className="modern-modal">
                    {/* Icon above title */}
                    <div className="modal-icon">
                        <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="12" fill="#eaf1fa"/>
                            <path d="M12 17v-2m-3-3a3 3 0 116 0v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" stroke="#0a3d2c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="modal-content">
                        <h2 className="modal-title">You need to log in to continue</h2>
                        <div className="modal-subtext">Please log in to add a property.</div>
                        <Link href="/login">
                            <button className="modal-btn">LOG IN</button>
                        </Link>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .modal-backdrop {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.18);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    animation: fadeIn 0.25s;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .modern-modal {
                    background: linear-gradient(135deg, #fff 80%, #eaf1fa 100%);
                    border-radius: 22px;
                    box-shadow: 0 12px 48px 0 rgba(31,38,135,0.22), 0 1.5px 8px 0 rgba(31,38,135,0.08);
                    min-width: 340px;
                    max-width: 420px;
                    width: 100%;
                    padding: 2.7rem 2.7rem 2.2rem 2.7rem;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    animation: modalPop 0.18s cubic-bezier(.4,2,.6,1) both;
                }
                @keyframes modalPop {
                    0% { transform: scale(0.95); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .modal-icon {
                    margin-bottom: 0.7rem;
                    margin-top: -0.5rem;
                }
                .modal-title {
                    font-size: 15px;
                    font-weight: 800;
                    color: #222;
                    margin-bottom: 0.7rem;
                    text-align: center;
                }
                .modal-subtext {
                    color: #666;
                    font-size: 13px;
                    margin-bottom: 2.1rem;
                    text-align: center;
                }
                .modal-btn {
                    width: 100%;
                    background: #0a3d2c;
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    padding: 1.05rem 0;
                    font-size: 1.13rem;
                    font-weight: 700;
                    letter-spacing: 1px;
                    margin-top: 0.5rem;
                    cursor: pointer;
                    transition: background 0.18s;
                }
                .modal-btn:hover {
                    background: #0d5c3b;
                }
            `}</style>
        </>
    )
}