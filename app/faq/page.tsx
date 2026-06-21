
import {
  BlockGrid,
  QuoteBlock,
  ProfileBlock,
  TagBlock,
  TextBlock,
  EmptyBlock,
  DSGrid,
  DSCard,
  DSSectionHead,
  DSCardLabel,
  IconTile,
} from '@/design-system/blocks';

export default function(){
    return (
            <div
      className="hub"
      style={{
        backgroundColor: 'var(--paper)',
        backgroundImage:
          'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px),linear-gradient(var(--grid-strong) 1px,transparent 1px),linear-gradient(90deg,var(--grid-strong) 1px,transparent 1px)',
        backgroundSize: '26px 26px,26px 26px,130px 130px,130px 130px',
        minHeight: '100vh',
      }}
    >
        <main style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 96px' }}>
        <h1>FAQ (자주 묻는 질문)</h1>
        <BlockGrid>
            <TextBlock >
            <span style={{ fontWeight: 600, fontSize: 20, color: 'var(--accent-text)'
                }}>CERN (유럽 핵·입자물리연구소) 가봤어요?</span>
             <br/>
             네.<br/>
             출입권한도 있고, 이메일도 있습니다. 다닌지는 대충 7년 넘었습니다. 심심하면 갑니다.
          </TextBlock>
            <TextBlock >
            <span style={{ fontWeight: 600, fontSize: 20, color: 'var(--accent-text)'
                }}>외국음식 많이 먹겠네요</span>
             <br/>
              한달 식사 중 사먹는건 4번 안쪽인 것 같습니다. 나머지는 집에서 한식해먹습니다.<br/>
              외식물가는 한국이 더 많이 저렴합니다. 여기서 외식 심플하게 할 돈이면 한국에서 거하게 술먹을 수도 있는듯.<br/>
              참고로 저는 이재모피자나 파파존스가 좋습니다.<br/><br/>
              가끔 한식치킨집 가서 참이슬 빨간뚜껑 두병이랑 치킨반마리 먹고 옵니다.
          </TextBlock>
            <TextBlock >
                <span style={{ fontWeight: 600, fontSize: 20, color: 'var(--accent-text)'
                }}>왜 스파게티를 부수면 안되나요?</span>
                <br/>
                스파게티를 부수는 것은 냉면을 가위로 4번이상 자르는 것과 비슷합니다. 이렇게 냉면을 매우 잘게 자르게 되면 젓가락으로 집기 어렵게 되겠지요? 스파게티를 자르는 것은 더 심각합니다.<br/>
                보통의 경우는 포크로 스파게티를 말아서 먹을텐데, 스파게티를 부수면, 면의 길이가 짧아져서 포크로 말기 어렵습니다. 그냥 먹는게 안된다고 보시면 됩니다. 포크는 젓가락처럼 그렇게 세밀하게 집을 수 있는 도구가 아닙니다.<br/>
                그거 아시나요? 이탈리아에서는 파스타 먹을 때 숟가락도 안줍니다. 숟가락으로 떠먹는 것도 안된다는 뜻입니다. 그릇에 남은 소스는 어떻게 먹냐고요? 빵으로 닦아먹습니다. 참고로 소스 남기는게 예의에 어긋난다는 이야기도 있습니다.<br/>
                <span style={{ fontWeight: 600, fontSize: 16
                }}>스파게티를 부수면 안됩니다. 다시 말합니다. 부수면 안됩니다.</span> <br/>
                부숴야 할만큼 냄비가 작다 싶으면 펜네, 푸실리 등 숏 파스타를 먹거나, 말려있는 롱파스타를 (딸리아뗄레 Tagliatelle 등) 사십시오. 제발.
            </TextBlock>
            <TextBlock >
            <span style={{ fontWeight: 600, fontSize: 20, color: 'var(--accent-text)'
                }}>진짜로 (아이스) 아메리카노를 안먹나요?</span>
             <br/>
             네.<br/>
             참고로 저는 한국에 살던 시절에도 아메리카노를 안마셨습니다.<br/>
             <i>아이스 아메리카노</i>가 <i>아이스 구정물</i>이라는데 동의하는 편입니다.<br/>
             그 맛대가리도 없는 무맛의 물을 왜 먹는지 잘 모르겠습니다. 그럴거면 차라리 녹차가 나을 것 같은데요. 녹차는 맛이라도 있지, 아메리카노는 맛이 없습니다. 그냥 물입니다. 물을 그 돈
             주고 사먹는게 이해가 안됩니다.
             <br/>
             에스프레소는 풍미가 있는 쓴맛이 나는 물이지, 아메리카노는 풍미는 저세상 보냈고 그냥 쓴맛만 약간 남은 물입니다. 그러니까 구정물이지 왜먹는지 모르겠습니다. <br/>
             <strong>동네 커피기계에 뽑아도 라바짜가 나오는데 왜 굳이 아메리카노를 먹어야할까요? ㅋㅋ</strong>
          </TextBlock>
          <TextBlock >
            <span style={{ fontWeight: 600, fontSize: 20, color: 'var(--accent-text)'
             }}>진짜로 파인애플 피자 극혐하나요?</span>
             <br/>
                잘 모르겠긴 한데, 아직 피자가게에서 보지는 못했습니다.<br/>
                예전에 나폴리에 있던 사람한테 물어봤는데 반쯤 극혐의 말을 하긴 했었습니다. 왜 그랬는지는 기억안남.
          </TextBlock>
          <TextBlock >
            <span style={{ fontWeight: 600, fontSize: 20, color: 'var(--accent-text)'
             }}>진짜로 크림파스타 안팔아요?</span>
             <br/>
                아직 파는 곳 못봤습니다.<br/>
                먹고 싶을 때에는 제가 집에서 해먹는 편입니다.<br/>
                아, 까르보나라 스파게티는 팝니다. 그게 일반적으로 아는 크림파스타는 아니고, 다른게 있습니다. 한국에서 까르보나라라고 부르는 크림파스타는, 알프레도라고 부릅니다.
          </TextBlock>
        </BlockGrid>
        </main>
        </div>
    )
}
