      document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelector('.slides');
            const slideItems = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            const dotsContainer = document.querySelector('.dots');
            
            let currentIndex = 0;
            let slideCount = slideItems.length;
            let autoSlideInterval;
            
            // 创建点指示器
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.dataset.index = i;
                dotsContainer.appendChild(dot);
            }
            
            const dots = document.querySelectorAll('.dot');
            
            // 更新幻灯片位置
            function updateSlidePosition() {
                slides.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // 更新激活的点
                dots.forEach(dot => dot.classList.remove('active'));
                dots[currentIndex].classList.add('active');
            }
            
            // 下一张幻灯片
            function nextSlide() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateSlidePosition();
            }
            
            // 上一张幻灯片
            function prevSlide() {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateSlidePosition();
            }
            
            // 启动自动轮播
            function startAutoSlide() {
                autoSlideInterval = setInterval(nextSlide, 3000);
            }
            
            // 停止自动轮播
            function stopAutoSlide() {
                clearInterval(autoSlideInterval);
            }
            
            // 事件监听
            nextBtn.addEventListener('click', function() {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
            
            prevBtn.addEventListener('click', function() {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
            
            // 点指示器点击事件
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    stopAutoSlide();
                    currentIndex = parseInt(this.dataset.index);
                    updateSlidePosition();
                    startAutoSlide();
                });
            });
            
            // 鼠标悬停时暂停自动轮播
            slides.addEventListener('mouseenter', stopAutoSlide);
            slides.addEventListener('mouseleave', startAutoSlide);
            
            // 开始自动轮播
            startAutoSlide();
        });