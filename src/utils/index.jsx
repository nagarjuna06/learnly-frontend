import { format, intlFormatDistance, parseISO } from "date-fns";
import categories from "./categories";
import languages from "./languages";

export const projectMode = import.meta.env.MODE === "development";

export const getInitials = (name) => name.charAt(0).toUpperCase();

export const getUUID = () => crypto.randomUUID();

export const passwordReg = new RegExp(
  "/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{0,8}$/"
);

export const convertNormalObject = (obj) => {
  const { social, ...remain } = obj;
  return { ...remain, ...social };
};

export const convertNestedObject = (obj) => {
  const initialObj = {
    website: "",
    twitter: "",
    youtube: "",
    linkedin: "",
    facebook: "",
  };

  const formData = new FormData(obj);
  const { instructor_profile, ...data } = Object.fromEntries(formData);
  for (var item in initialObj) {
    initialObj[item] = data[item];
    formData.delete(item);
  }
  formData.append("social", JSON.stringify(initialObj));
  if (instructor_profile.name === "") {
    formData.delete("instructor_profile");
  }
  return formData;
};

export const timeDiff = (time) => {
  const formatted = intlFormatDistance(new Date(parseISO(time)), new Date());
  return formatted;
};

export const dateFormat = (date, type = "s") => {
  if (!date) {
    return null;
  }
  if (type === "s") {
    return format(parseISO(date), "dd MMMM yyyy");
  } else {
    return format(parseISO(date), "MM/yyyy");
  }
};

export const timeToString = (time) => {
  if (!time) {
    return;
  }
  const [hrs] = time.split(":").map((x) => parseInt(x));
  if (hrs > 0) {
    return hrs === 1 ? `${hrs} total hour` : `${hrs} total hours+`;
  }
  return null;
};

export const setCourseIdToPath = (data, courseId) => {
  for (let item of data) {
    item.path = item.path.replace("{{courseId}}", courseId);
  }
  return data;
};

export const getSubCategory = (category) => {
  for (let item of categories) {
    if (item.title === category) {
      return item.subCategories;
    }
  }
  return [];
};

export const convertToPoints = (data) => {
  let finalData = data.map((each) => ({ points: each }));
  if (!finalData.length) {
    finalData = [{ points: "" }];
  }
  return finalData;
};

export const getTotalDuration = (contents, string = true) => {
  if (contents.length) {
    const durationArray = contents.map((each) => each.duration);
    let chapterDuration = 0;

    for (let each of durationArray) {
      chapterDuration += timeToMilliSeconds(each);
    }
    chapterDuration = milliSecondsToTime(chapterDuration);
    if (!string) {
      return chapterDuration;
    }

    return timeString(chapterDuration);
  }

  return null;
};

export const durationString = (time) => {
  const [hours, mins] = time.split(":");
  if (hours !== "00") {
    return `${hours}hr ${mins}min`;
  }

  if (mins) {
    return `${mins}min`;
  }
};

export const timeString = (string) => {
  if (!string) {
    return;
  }
  const [hours, mins, sec] = string.split(":");
  if (hours !== "00") {
    return `${hours}hr ${mins}min ${sec}sec`;
  }

  if (mins) {
    return `${mins}min ${sec}sec`;
  }
};
export const timeFormat = (time) => {
  const [hours, mins, sec] = time.split(":");
  if (hours === "00") {
    return `${mins}:${sec}`;
  } else {
    return time;
  }
};

export const timeToMilliSeconds = (timeInput) => {
  const [hrs, min, sec] = timeInput.split(":").map((x) => parseInt(x));
  const toMilliseconds = (hrs * 60 * 60 + min * 60 + sec) * 1000;
  return toMilliseconds;
};

export const milliSecondsToTime = (duration) => {
  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor(duration / (1000 * 60 * 60 * 24));
  if (days) {
    hours += days * 24;
  }
  hours = hours > 9 ? hours : `0${hours}`;
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  seconds = seconds > 9 ? seconds : `0${seconds}`;

  return `${hours}:${minutes}:${seconds}`;
};

export const addDurationToCurriculum = (curriculum) => {
  let updateCurriculum = curriculum.map((chapter) => ({
    ...chapter,
    duration: getTotalDuration(chapter.contents, false),
  }));
  const duration = getTotalDuration(updateCurriculum, false);
  return { curriculum: updateCurriculum, duration };
};

export const isAllChaptersFilled = (curriculum) => {
  for (let chapter of curriculum) {
    if (!chapter.chapterTitle) {
      return false;
    }
    for (let content of chapter.contents) {
      if (!content.contentTitle) {
        return false;
      }
    }
  }
  return true;
};

export const isAllContentsFilled = (contents) => {
  for (let content of contents) {
    if (!content.contentTitle) {
      return false;
    }
  }
  return true;
};
export const totalCurriculum = (curriculum) => {
  let lectures = 0;
  for (let chapter of curriculum) {
    lectures += chapter.contents.length;
  }
  return { chapters: curriculum.length, lectures };
};

export const checkboxArray = [
  { label: "Course details", value: "details" },
  { label: "Intended Learners", value: "intended" },
  { label: "Curriculum", value: "curriculum" },
];

export const checkBoxNames = {
  details: "Course details",
  intended: "Intended Learners",
  curriculum: "Curriculum",
};

export const setCheckboxNames = (data) => {
  if (data.length === 3) {
    return ["All"];
  } else {
    const newData = [];
    for (let item of data) {
      newData.push(checkBoxNames[item]);
    }
    return newData;
  }
};

export const convertToCheckboxState = (access) => {
  let state = {};
  for (let item in checkBoxNames) {
    state[item] = access.includes(item);
  }
  return state;
};

export const accessedMenus = (menu, access, courseId) => {
  let newMenu = [];
  for (let each of menu) {
    if (each?.access) {
      if (access.includes(each.access)) {
        newMenu.push(each);
      }
    } else {
      newMenu.push(each);
    }
  }
  return setCourseIdToPath(newMenu, courseId);
};

export const getLanguageNative = (language) => {
  for (let eachLang of languages) {
    if (eachLang.name === language) {
      return eachLang.nativeName;
    }
  }
  return language;
};

export const getEnrollId = (enrollCourses, courseId) => {
  for (let each of enrollCourses) {
    if (each.course === courseId) {
      return each._id;
    }
  }
};

export const getVideoList = (curriculum = []) => {
  let videos = [];

  curriculum.map((chapter, chId) => {
    chapter.contents.map((content, coId) => {
      videos.push({
        url: content.embedUrl,
        coId,
        chId,
        contentTitle: content.contentTitle,
        chapterTitle: chapter.chapterTitle,
      });
    });
  });
  return videos;
};

export const coursePublishRequire = (course) => {
  let errors = [];
  if (!course?.subtitle) {
    errors.push("subtitle is required.");
  }
  if (!course?.subCategory) {
    errors.push("subcategory is required.");
  }
  if (!course?.previewMedia) {
    errors.push("Promotional video is required.");
  }
  if (!course?.description) {
    errors.push("description is required.");
  }
  if (course?.highlights.length < 4) {
    errors.push(
      `atleast 4 highlights is required,you filled ${course?.highlights.length}.`
    );
  }
  if (course?.prerequisites.length < 2) {
    errors.push(
      `atleast 2 prerequisites is required,you filled ${course?.prerequisites.length}.`
    );
  }
  let lectures = 0;
  course.curriculum.map((each) => {
    each.contents.map((content) => {
      lectures += 1;
    });
  });
  if (lectures < 5) {
    errors.push(
      `atleast 5 lectures is required in curriculum,you filled ${lectures}.`
    );
  }
  return errors;
};
