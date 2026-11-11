
(function () {
    'use strict';
//https://www.lickingassholes.com/
    const managerUrl = '/La/Ads_Manager.php';

    function sendStat(action, id, location) {
        const body = new URLSearchParams({
            action: action,
            ad_id: String(id),
            location: location
        });

        return fetch(managerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: body.toString(),
            credentials: 'same-origin'
        }).catch(function (error) {
            console.error('Ads statistics error:', error);
        });
    }

    function activateScripts(container) {
        const scripts = Array.from(container.querySelectorAll('script'));

        scripts.forEach(function (oldScript) {
            const newScript = document.createElement('script');

            Array.from(oldScript.attributes).forEach(function (attr) {
                newScript.setAttribute(attr.name, attr.value);
            });

            newScript.textContent = oldScript.textContent;
            oldScript.replaceWith(newScript);
        });
    }

    function initializeAdBox(box) {
        if (box.dataset.adsInitialized === '1') return;

        box.dataset.adsInitialized = '1';

        const location = box.dataset.adLocation;
        if (!location) return;

        let ads = [];
        let currentIndex = -1;
        let timer = null;
        let activeAdId = null;

        function showNextAd() {
            if (!ads.length) return;

            currentIndex = (currentIndex + 1) % ads.length;

            const ad = ads[currentIndex];

            activeAdId = ad.Id;

            box.innerHTML = ad.Ads_Code || '';

            activateScripts(box);

            sendStat('impression', ad.Id, location);

            if (timer) clearTimeout(timer);

            timer = setTimeout(showNextAd, 5000);
        }

        box.addEventListener('click', function (event) {
            const link = event.target.closest('a');

            if (!link || !box.contains(link) || !activeAdId) return;

            sendStat('click', activeAdId, location);
        });

        fetch(
            managerUrl + '?action=ads&location=' + encodeURIComponent(location),
            { credentials: 'same-origin' }
        )
        .then(function (response) {
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }

            return response.json();
        })
        .then(function (data) {
            if (!Array.isArray(data) || data.length === 0) {
                box.innerHTML = '';
                return;
            }

            ads = data;
            showNextAd();
        })
        .catch(function (error) {
            console.error('Could not load ads for ' + location + ':', error);
        });
    }

    function initializeAllAds() {
        document.querySelectorAll('[data-ad-location]').forEach(
            initializeAdBox
        );
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAllAds);
    } else {
        initializeAllAds();
    }
})();