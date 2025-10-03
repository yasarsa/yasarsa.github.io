import React from 'react';
import { useSelector } from 'react-redux';
import doubleArrowLeftImg from '../../assets/double-arrow-left.svg';
import exportImg from '../../assets/export.svg';
import importImg from '../../assets/import.svg';
import type { RootState } from '../../store';
import usePopup from '../../utils/hooks/usePopup';
import styles from './Sidebar.module.css';

export default function Sidebar() {

    const { closeSidebar, showImportPopup } = usePopup()
    const { characters } = useSelector((state: RootState) => state.data)

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeSidebar();
        }
    }

    const handleExport = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(characters));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "characters.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    const handleImport = () => {
        showImportPopup();
    }

    return (
        <div className={styles.Overlay} onClick={handleOverlayClick}>
            <div className={styles.Sidebar}>
                <div className={styles.SidebarItem} onClick={closeSidebar}>
                    <img src={doubleArrowLeftImg} alt="Close Sidebar" />
                    <p>Close</p>
                </div>
                <div className={styles.SidebarItem} onClick={handleImport}>
                    <img src={importImg} alt="Import" />
                    <p>Import your characters</p>
                </div>

                <div className={styles.SidebarItem} onClick={handleExport}>
                    <img src={exportImg} alt="Export" />
                    <p>Export your characters</p>
                </div>
            </div>
        </div>
    );
}