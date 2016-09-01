'use strict'

export const totalStudents = (zipProps) => {
  return zipProps.students_gradeKto5 + zipProps.students_grade6to8 +
         zipProps.students_grade9to12 + zipProps.students_gradeKto12
}

export const totalSlots = (zipProps) => {
  return zipProps.slots_gradeKto5 + zipProps.slots_grade6to8 +
         zipProps.slots_grade9to12 + zipProps.slots_gradeKto12
}
