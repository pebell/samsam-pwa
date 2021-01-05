const dbNAME = 'SamSamDB';
const dbSTORE = 'PWA';

export const SimpleIDB = {
    initialize() {
        return new Promise<void>((resolve, reject) => {
            const request = indexedDB.open(dbNAME);
            request.onsuccess = _ => {
                if (request.result.objectStoreNames.contains(dbSTORE)) {
                    resolve();
                }
            };
            request.onupgradeneeded = _ => {
                request.result.createObjectStore(dbSTORE);
                resolve();
            };
            request.onerror = _ => reject(request.error);
        });
    },

    get(key: string) {
        return new Promise((resolve, reject) => {
            const oRequest = indexedDB.open(dbNAME);
            oRequest.onsuccess = () => {
                const db = oRequest.result;
                const tx = db.transaction(dbSTORE, 'readonly');
                const st = tx.objectStore(dbSTORE);
                const gRequest = st.get(key);
                gRequest.onsuccess = s => {
                    resolve(gRequest.result);
                };
                gRequest.onerror = _ => {
                    reject(gRequest.error);
                };
            };
            oRequest.onerror = _ => {
                reject(oRequest.error);
            };
        });
    },

    set(key: string, value: any) {
        return new Promise<void>((resolve, reject) => {
            const oRequest = indexedDB.open(dbNAME);
            oRequest.onsuccess = () => {
                const db = oRequest.result;
                const tx = db.transaction(dbSTORE, 'readwrite');
                const st = tx.objectStore(dbSTORE);
                const sRequest = st.put(value, key);
                sRequest.onsuccess = _ => {
                    resolve();
                };
                sRequest.onerror = _ => {
                    reject(sRequest.error);
                };
            };
            oRequest.onerror = _ => {
                reject(oRequest.error);
            };
        });
    },

    remove(key: string) {
        return new Promise<void>((resolve, reject) => {
            const oRequest = indexedDB.open(dbNAME);
            oRequest.onsuccess = () => {
                const db = oRequest.result;
                const tx = db.transaction(dbSTORE, 'readwrite');
                const st = tx.objectStore(dbSTORE);
                const rRequest = st.delete(key);
                rRequest.onsuccess = _ => {
                    resolve();
                };
                rRequest.onerror = _ => {
                    reject(rRequest.error);
                };
            };
            oRequest.onerror = _ => {
                reject(oRequest.error);
            };
        });
    },
};
