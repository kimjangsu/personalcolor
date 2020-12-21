const URL = "https://teachablemachine.withgoogle.com/models/1dqMNHerO/";
  let model, webcam, labelContainer, maxPredictions;

  async function init() {
    console.log('init start');
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();
      labelContainer = document.getElementById("label-container");
      for (let i = 0; i < maxPredictions; i++) {
          var element = document.createElement("div")
          element.classList.add("d-flex");
          labelContainer.appendChild(element);
      }
  }

  async function predict() {
    console.log('predict start');
      var image = document.getElementById("skin-image")
      const prediction = await model.predict(image, false);
      prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
      console.log(prediction[0].className);
      var resultTitle, resultExplain, resultCeleb;
      gtag('event', '퍼스널컬러 진단 수행', {
          'event_category': '퍼스널컬러 진단 수행',
          'event_label': 'PC'
      });
      switch (prediction[0].className) {
              case "spring-warm":
                  resultTitle = "생기발랄한 봄 웜톤 😊";
                  resultExplain = "봄 웜톤은 생기발랄한 느낌과 귀여운 이미지가 특징이에요! 색동저고리 처럼 쨍한 컬러와 선명하고 밝은 톤을 잘 소화할 수 있어요! 파스텔 톤은 금지!";
                  resultCeleb = "봄 웜톤 대표 연예인:  아이유, 수지, 박보영, 조보아, 박민영, 송혜교, 서현진, 유인나";
                  gtag('event', '결과 봄웜톤', {'event_category': '퍼스널컬러 결과'});
                  break;
              case "summer-cool":
                  resultTitle = "시원하고 청량한 여름 쿨톤 😘";
                  resultExplain = "시원하고 깨끗한 인상을 주며 매치하는 컬러에 따라 우아하고 세련 된 이미지가 되는 여름 쿨톤! 봄 웜톤처럼 맑고 밝은 컬러도 잘 소화하지만 비비드한 컬러보다는 차분하고 부드러운 뮤트톤이 더 잘어울려요 :D";
                  resultCeleb = "여름쿨톤 대표 연예인: 태연, 이영애, 손예진, 아이린, 김연아, 김고은, 김태리, 티파니 ,설현";
                  gtag('event', '결과 여름쿨톤', {'event_category': '퍼스널컬러 결과'});
                  break;
              case "autumn-mute":
                  resultTitle = "톤팡질팡하고 있는 당신은?! 가을 뮤트톤 🙋";
                  resultExplain = "가을 뮤트 톤은 뚜렷하게 어울리는 색상이 없이 때문에 쿨톤으로 착각하는 경우가 많아요! 하지만 화려하고 과감한 색상도 쉽게 소화하고 특유의 고혹적이면서도 생기 있는 매력이 있어요!";
                  resultCeleb = "가을뮤트톤 대표 연예인: 이성경, 윤승아, 한효주, 정려원, 정유미, 박보영";
                  gtag('event', '결과 가을뮤트톤', {'event_category': '퍼스널컬러 결과'});
                  break;
              case "autumn-warm":
                  resultTitle = "분위기 여신 가을 웜톤🙌";
                  resultExplain = "카키, 초콜렛, 브라운 계열의 빈티지한 컬러가 찰떡궁합!  다른 톤에 비해 성숙하고 차분한 이미지가 특징인 매력만점인 가을 웜톤은 파스텔 톤과 차가운 톤만 피하면 끝!";
                  resultCeleb = "가을 웜톤 대표 연예인: 제니, 이효리, 전지현, 한예슬, 신민아, 수애, 가인, 신세경";
                  gtag('event', '결과 가을웜톤', {'event_category': '퍼스널컬러 결과'});
                  break;
              case "winter-cool":
                  resultTitle = "카리스마 겨울 쿨톤 ❄";
                  resultExplain = "강한 대비를 이루는 색상이 너무 잘어울리는 겨울 쿨톤 세련되고 도시적인 느낌이 팡팡! 색상은 여러색상을 조합하기 보다는 원포인트로!";
                  resultCeleb = " 겨울 쿨톤 대표 연예인: 김혜수, 이나영, 아이린, 차예련, 이영애, 김소연, 선미, 청하, 채영, 현아, 김옥빈, 서예지, 이다희";
                  gtag('event', '결과 겨울쿨톤', {'event_category': '퍼스널컬러 결과'});
                  break;
              default:
                  resultTitle = "알수없음";
                  resultExplain = "";
                  resultCeleb = "";
                  gtag('event', '결과 알수없음', {'event_category': '결과 알수 없음'});
          }

      var title = "<div class='" + prediction[0].className + "-personal-color-title'>" + resultTitle + "</div>";
      var explain = "<div class='personal-color-explain pt-2'>" + resultExplain + "</div>";
      var celeb = "<div class='" + prediction[0].className + "-personal-color-celeb pt-2 pb-2'>" + resultCeleb + "</div>";
      var recommand_color = "<img src='/img/" + prediction[0].className + "-pl.png' style='width:100%'/>";
      $('.result-message').html(title + explain + celeb + recommand_color);
      var barWidth;
      for (let i = 0; i < maxPredictions; i++) {
          if (prediction[i].probability.toFixed(2) > 0.1) {
              barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + "%";
          } else if (prediction[i].probability.toFixed(2) >= 0.01) {
              barWidth = "4%";
          } else {
              barWidth = "2%";
          }
          var labelTitle;
          switch (prediction[i].className) {
              case "spring-warm":
                  labelTitle = "봄웜톤";
                  break;
              case "summer-cool":
                  labelTitle = "여름쿨톤";
                  break;
              case "autumn-mute":
                  labelTitle = "가을뮤트톤";
                  break;
              case "autumn-warm":
                  labelTitle = "가을웜톤";
                  break;
              case "winter-cool":
                  labelTitle = "겨울쿨톤";
                  break;
              default:
                  labelTitle = "알수없음";
          }
          var label = "<div class='personal-color-label d-flex align-items-center'>" + labelTitle + "</div>";
          var bar = "<div class='bar-container position-relative container'><div class='" + prediction[i].className +
          "-box'></div><div class='d-flex justify-content-center align-items-center " + prediction[i].className +
          "-bar' style='width: " + barWidth + "'><span class='d-block percent-text'>" + Math.round(prediction[i].probability.toFixed(2) * 100) +
          "%</span></div></div>";

          labelContainer.childNodes[i].innerHTML = label + bar;
      }
    }
