const { myDataSource } = require("./typeorm-client");

const isGenreIdVaild = async (genreId) => {
  const result = await myDataSource.query(
    `SELECT EXISTS (SELECT * FROM genres WHERE id=?) as isExist`,
    [genreId],
  );
  const isExist = Object.values(JSON.parse(JSON.stringify(result)))[0].isExist;
  if (isExist == 1) {
    return;
  } else {
    let error = new Error("Error: No Data");
    error.code = 204;
    throw error;
  }
};

let result = {
  cards: {
    genre: [
      {
        id: "1",
        category: "장르",
        img: "https://ifh.cc/g/ChT0RK.png",
        title: "국내 발라드",
      },
      {
        id: "2",
        category: "장르",
        img: "https://ifh.cc/g/onbOXD.png",
        title: "해외 팝",
      },
      {
        id: "3",
        category: "장르",
        img: "https://ifh.cc/g/OrDVXV.png",
        title: "국내 댄스",
      },
      {
        id: "4",
        category: "장르",
        img: "https://ifh.cc/g/ZwtQ5G.png",
        title: "국내 알앤비",
      },
      {
        id: "5",
        category: "장르",
        img: "https://ifh.cc/g/oLkvrT.png",
        title: "국내 힙합",
      },
      {
        id: "6",
        category: "장르",
        img: "https://ifh.cc/g/RtNHvV.png",
        title: "트로트",
      },
      {
        id: "7",
        category: "장르",
        img: "https://ifh.cc/g/7AsGF8.png",
        title: "해외 알앤비",
      },
      {
        id: "8",
        category: "장르",
        img: "https://ifh.cc/g/Jo5H9s.pngg",
        title: "해외 힙합",
      },
      {
        id: "9",
        category: "장르",
        img: "https://ifh.cc/g/G7AajF.png",
        title: "OST",
      },
      {
        id: "10",
        category: "장르",
        img: "https://ifh.cc/g/GnVRz6.png",
        title: "키즈",
      },
      {
        id: "11",
        category: "장르",
        img: "https://ifh.cc/g/ry9acW.png",
        title: "국내 인디",
      },
      {
        id: "12",
        category: "장르",
        img: "https://ifh.cc/g/Q6Hq3x.png",
        title: "클래식",
      },
      {
        id: "13",
        category: "장르",
        img: "https://ifh.cc/g/mk629F.png",
        title: "뉴에이지",
      },
      {
        id: "14",
        category: "장르",
        img: "https://ifh.cc/g/mYh1LX.png",
        title: "재즈",
      },
      {
        id: "15",
        category: "장르",
        img: "https://ifh.cc/g/APW2yA.png",
        title: "국내 어쿠스틱",
      },
      {
        id: "16",
        category: "장르",
        img: "https://ifh.cc/g/pwwWQj.png",
        title: "국내 블루스",
      },
      {
        id: "17",
        category: "장르",
        img: "https://ifh.cc/g/SaLtcv.png",
        title: "국내 락/메탈",
      },
      {
        id: "18",
        category: "장르",
        img: "https://ifh.cc/g/Yhts4m.png",
        title: "해외 일렉트로닉",
      },
      {
        id: "19",
        category: "장르",
        img: "https://ifh.cc/g/MkFqm6.png",
        title: "해외 락",
      },
      {
        id: "20",
        category: "장르",
        img: "https://ifh.cc/g/FScKOx.png",
        title: "해외 메탈",
      },
      {
        id: "21",
        category: "장르",
        img: "https://ifh.cc/g/ChT0RK.png",
        title: "J-POP",
      },
      {
        id: "22",
        category: "장르",
        img: "https://ifh.cc/g/onbOXD.png",
        title: "맘/태교",
      },
      {
        id: "23",
        category: "장르",
        img: "https://ifh.cc/g/OrDVXV.png",
        title: "CCM",
      },
      {
        id: "24",
        category: "장르",
        img: "https://ifh.cc/g/onbOXD.png",
        title: "월드뮤직",
      },
      {
        id: "25",
        category: "장르",
        img: "https://ifh.cc/g/Yhts4m.png",
        title: "국악",
      },
      {
        id: "26",
        category: "장르",
        img: "https://ifh.cc/g/ZwtQ5G.png",
        title: "종교음악",
      },
    ],
    situation: [
      {
        id: "1",
        category: "상황",
        img: "https://ifh.cc/g/ChT0RK.png",
        title: "플대디",
      },
      {
        id: "2",
        category: "상황",
        img: "https://ifh.cc/g/onbOXD.png",
        title: "월간 뮤직",
      },
      {
        id: "3",
        category: "상황",
        img: "https://ifh.cc/g/7AsGF8.png",
        title: "OTT",
      },
      {
        id: "4",
        category: "상황",
        img: "https://ifh.cc/g/OrDVXV.png",
        title: "드라이브",
      },
      {
        id: "5",
        category: "상황",
        img: "https://ifh.cc/g/ZwtQ5G.png",
        title: "MBTI",
      },
      {
        id: "6",
        category: "상황",
        img: "https://ifh.cc/g/oLkvrT.png",
        title: "공부",
      },
      {
        id: "7",
        category: "상황",
        img: "https://ifh.cc/g/RtNHvV.png",
        title: "사랑",
      },
      {
        id: "8",
        category: "상황",
        img: "https://ifh.cc/g/Jo5H9s.pngg",
        title: "이별",
      },
      {
        id: "9",
        category: "상황",
        img: "https://ifh.cc/g/G7AajF.png",
        title: "운동/헬스",
      },
      {
        id: "10",
        category: "상황",
        img: "https://ifh.cc/g/GnVRz6.png",
        title: "산책/여행",
      },
      {
        id: "11",
        category: "상황",
        img: "https://ifh.cc/g/ry9acW.png",
        title: "아침",
      },
      {
        id: "12",
        category: "상황",
        img: "https://ifh.cc/g/Q6Hq3x.png",
        title: "밤/새벽",
      },
      {
        id: "13",
        category: "상황",
        img: "https://ifh.cc/g/mk629F.png",
        title: "카페",
      },
      {
        id: "14",
        category: "상황",
        img: "https://ifh.cc/g/mYh1LX.png",
        title: "휴식/힐링",
      },
      {
        id: "15",
        category: "상황",
        img: "https://ifh.cc/g/APW2yA.png",
        title: "추억/리메이크",
      },
      {
        id: "16",
        category: "상황",
        img: "https://ifh.cc/g/pwwWQj.png",
        title: "클럽/파티",
      },
      {
        id: "17",
        category: "상황",
        img: "https://ifh.cc/g/SaLtcv.png",
        title: "출/퇴근",
      },
      {
        id: "18",
        category: "상황",
        img: "https://ifh.cc/g/Yhts4m.png",
        title: "계절/날씨",
      },
      {
        id: "19",
        category: "상황",
        img: "https://ifh.cc/g/MkFqm6.png",
        title: "혼술/혼밥",
      },
      {
        id: "20",
        category: "상황",
        img: "https://ifh.cc/g/FScKOx.png",
        title: "목소리/음색",
      },
      {
        id: "21",
        category: "상황",
        img: "https://ifh.cc/g/ChT0RK.png",
        title: "내 방",
      },
      {
        id: "22",
        category: "상황",
        img: "https://ifh.cc/g/onbOXD.png",
        title: "노래방",
      },
      {
        id: "23",
        category: "상황",
        img: "https://ifh.cc/g/OrDVXV.png",
        title: "호텔/라운지",
      },
      {
        id: "24",
        category: "상황",
        img: "https://ifh.cc/g/onbOXD.png",
        title: "공연/아티스트",
      },
      {
        id: "25",
        category: "상황",
        img: "https://ifh.cc/g/Yhts4m.png",
        title: "자장가",
      },
      {
        id: "26",
        category: "상황",
        img: "https://ifh.cc/g/ZwtQ5G.png",
        title: "펍/바",
      },
      {
        id: "27",
        category: "상황",
        img: "https://ifh.cc/g/ChT0RK.png",
        title: "일/작업",
      },
      {
        id: "28",
        category: "상황",
        img: "https://ifh.cc/g/onbOXD.png",
        title: "WHO'S",
      },
    ],
    atmosphere: [
      {
        id: "1",
        category: "분위기",
        img: "https://ifh.cc/g/7AsGF8.png",
        title: "신나는",
      },
      {
        id: "2",
        category: "분위기",
        img: "https://ifh.cc/g/OrDVXV.png",
        title: "잔잔한",
      },
      {
        id: "3",
        category: "분위기",
        img: "https://ifh.cc/g/ZwtQ5G.png",
        title: "위로하는",
      },
      {
        id: "",
        category: "분위기",
        img: "https://ifh.cc/g/oLkvrT.png",
        title: "감성적인",
      },
      {
        id: "5",
        category: "분위기",
        img: "https://ifh.cc/g/RtNHvV.png",
        title: "슬플 때",
      },
      {
        id: "6",
        category: "분위기",
        img: "https://ifh.cc/g/Jo5H9s.pngg",
        title: "우울할 떄",
      },
      {
        id: "7",
        category: "분위기",
        img: "https://ifh.cc/g/G7AajF.png",
        title: "달달한",
      },
      {
        id: "8",
        category: "분위기",
        img: "https://ifh.cc/g/GnVRz6.png",
        title: "상쾌한",
      },
      {
        id: "9",
        category: "분위기",
        img: "https://ifh.cc/g/ry9acW.png",
        title: "기분전환",
      },
      {
        id: "10",
        category: "분위기",
        img: "https://ifh.cc/g/Q6Hq3x.png",
        title: "트렌디한",
      },
      {
        id: "11",
        category: "분위기",
        img: "https://ifh.cc/g/mk629F.png",
        title: "그루브한",
      },
      {
        id: "12",
        category: "분위기",
        img: "https://ifh.cc/g/mYh1LX.png",
        title: "파워풀한",
      },
      {
        id: "13",
        category: "분위기",
        img: "https://ifh.cc/g/APW2yA.png",
        title: "나른한",
      },
      {
        id: "14",
        category: "분위기",
        img: "https://ifh.cc/g/pwwWQj.png",
        title: "몽환적인",
      },
      {
        id: "15",
        category: "분위기",
        img: "https://ifh.cc/g/SaLtcv.png",
        title: "즐거운",
      },
      {
        id: "16",
        category: "분위기",
        img: "https://ifh.cc/g/Yhts4m.png",
        title: "로맨틱한",
      },
    ],
    audio: [
      {
        id: "1",
        category: "오디오",
        img: "https://ifh.cc/g/MkFqm6.png",
        title: "새로 나왔어요",
      },
      {
        id: "2",
        category: "오디오",
        img: "https://ifh.cc/g/FScKOx.png",
        title: "음악",
      },
      {
        id: "3",
        category: "오디오",
        img: "https://ifh.cc/g/ChT0RK.png",
        title: "예능",
      },
      {
        id: "4",
        category: "오디오",
        img: "https://ifh.cc/g/onbOXD.png",
        title: "힐링",
      },
      {
        id: "5",
        category: "오디오",
        img: "https://ifh.cc/g/OrDVXV.png",
        title: "교양",
      },
      {
        id: "6",
        category: "오디오",
        img: "https://ifh.cc/g/onbOXD.png",
        title: "문화",
      },
      {
        id: "7",
        category: "오디오",
        img: "https://ifh.cc/g/Yhts4m.png",
        title: "시사",
      },
      {
        id: "8",
        category: "오디오",
        img: "https://ifh.cc/g/ChT0RK.png",
        title: "오디오드라마",
      },
      {
        id: "9",
        category: "오디오",
        img: "https://ifh.cc/g/onbOXD.png",
        title: "스포츠",
      },
    ],
  },
};

const getSongsOrderByPlayCount = async () => {
  result.chart = await myDataSource.query(
    `SELECT id AS songId, songTitle, songArtist, albumTitle, albumCover, content
    FROM songDetail AS sd 
    LEFT JOIN songPlayCountSum AS spcs ON sd.id = spcs.song_id 
    ORDER BY spcs.total_count DESC`,
  );
  return result;
};

const getSongsByGenreOrderByPlayCount = async (genreId) => {
  result.chart = await myDataSource.query(
    `SELECT sd.id AS songId, songTitle, songArtist, albumTitle, albumCover, g.name AS songGenre, sd.content
    FROM songDetail AS sd 
    LEFT JOIN songPlayCountSum AS spcs ON sd.id = spcs.song_id 
    LEFT JOIN songs AS s ON sd.id = s.id
    LEFT JOIN genres AS g ON s.genre_id = g.id
    WHERE g.id = ?
    ORDER BY spcs.total_count DESC`,
    [genreId],
  );
  return result;
};

module.exports = {
  isGenreIdVaild,
  getSongsOrderByPlayCount,
  getSongsByGenreOrderByPlayCount,
};
