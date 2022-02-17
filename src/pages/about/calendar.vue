<template>
  <ul class="activity-calendar" :class="{ dark: isDarkTheme }" @mouseenter="handleHover">
    <li class="month" v-for="(month, index) in months" :key="index">
      <div
        class="day"
        v-for="(day, i) in month"
        :key="i"
        :data-date="day.date"
        :data-total-count="day.total"
        :data-article-count="day.articles"
        :data-tweet-count="day.tweets"
        :data-contribution-count="day.contributions"
      >
        <div class="point">
          <div
            class="item articles"
            :style="{ height: getPointHeightStyle(day.articles / day.total) }"
          />
          <div
            class="item tweets"
            :style="{ height: getPointHeightStyle(day.tweets / day.total) }"
          />
          <div
            class="item contributions"
            :style="{
              height: getPointHeightStyle(day.contributions / day.total),
              backgroundColor: day.githubColor
            }"
          />
        </div>
        <div class="tooltip" v-if="day.total">
          <p class="date">{{ day.date }}</p>
          <ul class="counts">
            <li class="item articles">
              <i class="iconfont icon-quill"></i>
              <span class="count">{{ day.articles }}</span>
              articles
            </li>
            <li class="item tweets">
              <i class="iconfont icon-twitter"></i>
              <span class="count">{{ day.tweets }}</span>
              tweets
            </li>
            <li class="item contributions">
              <i class="iconfont icon-github"></i>
              <span class="count">{{ day.contributions }}</span>
              contributions
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import {
    useArticleCalendarStore,
    useTwitterCalendarStore,
    useGitHubCalendarStore
  } from '/@/store/aggregate'
  import { GAEventCategories } from '/@/constants/gtag'
  import { dateToHuman, HumanDate, humanDateToYMD } from '/@/transforms/moment'

  export default defineComponent({
    name: 'ActivityCalendar',
    setup() {
      const { gtag, isDarkTheme } = useEnhancer()
      const months = ref<Array<Array<ReturnType<typeof getDayObject>>>>([])
      const articleCalendar = useArticleCalendarStore()
      const twitterCalendar = useTwitterCalendarStore()
      const githubCalendar = useGitHubCalendarStore()
      const getDayObject = (date: string) => {
        const articles = articleCalendar.data.find((i) => i.date === date)?.count || 0
        const tweets = twitterCalendar.data.find((i) => i.date === date)?.count || 0
        const contributionsObj = githubCalendar.days.find((i) => i.date === date)
        const contributions = contributionsObj?.count || 0
        return {
          date,
          total: articles + tweets + contributions,
          tweets,
          articles,
          contributions,
          githubColor: contributionsObj?.color
        }
      }

      const getPointHeightStyle = (value: number) => {
        return isNaN(value) ? 0 : `${Math.floor(value * 100)}%`
      }

      const handleHover = () => {
        gtag?.event('calendar', {
          event_category: GAEventCategories.About
        })
      }

      const makeMonthDays = () => {
        // current month | day
        const today = new Date()
        const todayHuman = dateToHuman(today)
        const currentMonthDays = Array.from({ length: todayHuman.day }).map((_, i) => {
          const date = humanDateToYMD({ ...todayHuman, day: i + 1 })
          return getDayObject(date)
        })
        const getPrevMonthFullDays = (date: HumanDate, prevMonths: number) => {
          const targetMonth = new Date(date.year, date.month - prevMonths, 0)
          const daysCount = targetMonth.getDate()
          return Array.from({ length: daysCount }).map((d, i) => {
            const date = humanDateToYMD({ ...dateToHuman(targetMonth), day: i + 1 })
            return getDayObject(date)
          })
        }

        return [
          getPrevMonthFullDays(todayHuman, 12),
          getPrevMonthFullDays(todayHuman, 11),
          getPrevMonthFullDays(todayHuman, 10),
          getPrevMonthFullDays(todayHuman, 9),
          getPrevMonthFullDays(todayHuman, 8),
          getPrevMonthFullDays(todayHuman, 7),
          getPrevMonthFullDays(todayHuman, 6),
          getPrevMonthFullDays(todayHuman, 5),
          getPrevMonthFullDays(todayHuman, 4),
          getPrevMonthFullDays(todayHuman, 3),
          getPrevMonthFullDays(todayHuman, 2),
          getPrevMonthFullDays(todayHuman, 1),
          currentMonthDays
        ]
      }

      onMounted(() => {
        Promise.all([
          articleCalendar.fetch(),
          twitterCalendar.fetch(),
          githubCalendar.fetch()
        ]).finally(() => {
          months.value = makeMonthDays()
        })
      })

      return {
        isDarkTheme,
        months,
        getPointHeightStyle,
        handleHover
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .activity-calendar {
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    min-height: 7rem;
    &.dark {
      .month {
        .day {
          background-color: $module-bg-darker-1;
          .point {
            filter: brightness(86%);
          }
          .tooltip {
            color: $text-reversal;
            #{--background}: rgba($white, 0.9);
          }
        }
      }
    }

    .month {
      width: auto;
      display: grid;
      grid-template-rows: repeat(7, 1fr);
      grid-auto-flow: column;
      grid-auto-columns: min-content;
      grid-gap: 4px;
      @include scroll-snap-item();

      .day {
        $size: 10px;
        $radius: 1px;
        position: relative;
        width: $size;
        height: $size;
        background-color: $module-bg-darker-2;
        border-radius: $radius;
        &:not([data-total-count='0']) {
          &:hover {
            outline: 1px solid $theme-black;
          }
          .point:hover {
            & + .tooltip {
              @include visible();
            }
          }
        }

        .point {
          display: block;
          width: $size;
          height: $size;
          border-radius: $radius;
          overflow: hidden;

          .item {
            width: 100%;
            &.articles {
              background-color: $rss-primary;
            }
            &.tweets {
              background-color: $twitter-primary;
            }
          }
        }

        .tooltip {
          #{--background}: rgba($black, 0.9);
          position: absolute;
          left: 22px;
          top: 0;
          transform: translateY(-50%);
          white-space: nowrap;
          z-index: $z-index-normal + 1;
          padding: $sm-gap $gap;
          background-color: var(--background);
          border-radius: $xs-radius;
          color: $text-reversal;
          @include hidden();
          &::before {
            $size: 4px;
            content: '';
            position: absolute;
            left: -$size * 2;
            top: 50%;
            width: 0;
            height: 0;
            border-top: $size * 1.5 solid transparent;
            border-right: $size * 2 solid var(--background);
            border-bottom: $size * 1.5 solid transparent;
          }

          .date {
            font-weight: bold;
            margin-bottom: $sm-gap;
          }

          .counts {
            margin: 0;
            padding: 0;
            list-style: none;

            .item {
              line-height: 1.8em;
              font-size: $font-size-small;
              &.articles {
                color: $rss-primary;
              }
              &.tweets {
                color: $twitter-primary;
              }

              .count {
                margin-left: $sm-gap;
                font-weight: bold;
              }
            }
          }
        }

        /* articles */
        /* 8+ */
        &:not([data-article-count='0']) {
          .point {
            .articles {
              background-color: $rss-primary;
            }
          }
        }
        /* 1 */
        &[data-article-count='1'] {
          .point {
            .articles {
              background-color: lighten($rss-primary, 20%);
            }
          }
        }
        /* 2-4 */
        &[data-article-count='2'],
        &[data-article-count='3'],
        &[data-article-count='4'] {
          .point {
            .articles {
              background-color: lighten($rss-primary, 10%);
            }
          }
        }

        /* tweets */
        /* 8+ */
        &:not([data-tweet-count='0']) {
          .point {
            .tweets {
              background-color: $twitter-primary;
            }
          }
        }
        /* 1 */
        &[data-tweet-count='1'] {
          .point {
            .tweets {
              background-color: lighten($twitter-primary, 22%);
            }
          }
        }
        /* 2-4 */
        &[data-tweet-count='2'],
        &[data-tweet-count='3'],
        &[data-tweet-count='4'] {
          .point {
            .tweets {
              background-color: lighten($twitter-primary, 16%);
            }
          }
        }
        /* 5-8 */
        &[data-tweet-count='5'],
        &[data-tweet-count='6'],
        &[data-tweet-count='7'],
        &[data-tweet-count='8'] {
          .point {
            .tweets {
              background-color: lighten($twitter-primary, 8%);
            }
          }
        }
      }
    }
  }
</style>
