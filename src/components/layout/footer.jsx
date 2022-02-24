import React from 'react';

export const Footer = () => {
    return (
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-2 px-4 px-xl-5 bg-primary footer">
            <div className="text-white mb-3 mb-md-0">
                Copyright © {new Date().getFullYear()}. All rights reserved.
            </div>
            <div>
                <span className="text-white me-3">PoliScrypts social links</span>
                <a href="#!" className="text-white me-2">
                    <i className="bi bi-facebook"></i>
                </a>
                <a href="#!" className="text-white me-2">
                    <i className="bi bi-twitter"></i>
                </a>
                <a href="#!" className="text-white me-2">
                    <i className="bi bi-google"></i>
                </a>
                <a href="#!" className="text-white">
                    <i className="bi bi-linkedin"></i>
                </a>
            </div>
        </div>
    );
}